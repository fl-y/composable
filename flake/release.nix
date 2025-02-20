{ self, ... }: {
  perSystem =
    { config, self', inputs', pkgs, system, crane, systemCommonRust, ... }: {
      packages = let
        nix-config = ''
          --allow-import-from-derivation --extra-experimental-features "flakes nix-command" --no-sandbox --accept-flake-config --option sandbox relaxed'';
        packages = self'.packages;
        make-bundle = type: package:
          self.inputs.bundlers.bundlers."${system}"."${type}" package;
        subwasm-version = runtime:
          builtins.readFile (pkgs.runCommand "subwasm-version" { } ''
            ${packages.subwasm}/bin/subwasm version ${runtime}/lib/runtime.optimized.wasm | grep specifications | cut -d ":" -f2 | cut -d " " -f3 | head -c -1 > $out
          '');

      in rec {
        generated-release-body = let
          subwasm-call = runtime:
            builtins.readFile (pkgs.runCommand "subwasm-info" { } ''
              ${packages.subwasm}/bin/subwasm info ${runtime}/lib/runtime.optimized.wasm | tail -n+2 | head -c -1 > $out
            '');
          flake-url =
            "github:ComposableFi/composable/release-v${packages.composable-node.version}";
        in pkgs.writeTextFile {
          name = "release.txt";
          text = ''
            ## Runtimes
            ### Picasso
            ```
            ${subwasm-call packages.picasso-runtime}
            ```
            ### Composable
            ```
            ${subwasm-call packages.composable-runtime}
            ```
            ## Nix
            ```bash
            # Generate the Wasm runtimes
            nix build ${flake-url}#picasso-runtime ${nix-config}
            nix build ${flake-url}#composable-runtime ${nix-config}

            # Run the Composable node (release mode) alone
            nix run ${flake-url}#composable-node ${nix-config}

            # Spin up a local devnet
            nix run ${flake-url}#devnet-picasso ${nix-config}
            nix run ${flake-url}#devnet-composable ${nix-config}

            # CW CLI tool
            nix run ${flake-url}#ccw ${nix-config}

            # Spin up a local XC(Inter chain) devnet
            nix run ${flake-url}#devnet-xc-fresh ${nix-config}
            ```
          '';
        };

        tag-release = pkgs.writeShellApplication {
          name = "tag-release";
          runtimeInputs = [ pkgs.git pkgs.yq ];
          text = ''
            git tag --sign "release-v$1" --message "RC" && git push origin "release-v$1" --force
          '';
        };

        delete-release-tag-unsafe = pkgs.writeShellApplication {
          name = "delete-release-tag-unsafe";
          runtimeInputs = [ pkgs.git pkgs.yq ];
          text = ''
            # shellcheck disable=SC2015
            git tag --delete "release-v$1" || true && git push --delete origin "release-v$1"
          '';
        };

        generate-release-artifacts = pkgs.writeShellApplication {
          name = "generate-release-artifacts";
          runtimeInputs =
            [ pkgs.bash pkgs.binutils pkgs.coreutils pkgs.cacert ];
          text = ''
            mkdir -p release-artifacts/to-upload/

            echo "Generate release body"
            cp ${generated-release-body} release-artifacts/release.txt

            echo "Generate wasm runtimes"
            cp ${packages.picasso-runtime}/lib/runtime.optimized.wasm release-artifacts/to-upload/picasso_runtime_${
              subwasm-version packages.picasso-runtime
            }.wasm
            cp ${packages.composable-runtime}/lib/runtime.optimized.wasm release-artifacts/to-upload/composable_runtime_${
              subwasm-version packages.composable-runtime
            }.wasm

            cp ${packages.picasso-testfast-runtime}/lib/runtime.optimized.wasm release-artifacts/to-upload/picasso_testfast_runtime_${
              subwasm-version packages.picasso-testfast-runtime
            }.wasm

            cp ${packages.composable-testfast-runtime}/lib/runtime.optimized.wasm release-artifacts/to-upload/composable_testfast_runtime_${
              subwasm-version packages.composable-testfast-runtime
            }.wasm

            echo "Generate node packages"
            cp ${
              make-bundle "toRPM" packages.composable-node
            }/*.rpm release-artifacts/to-upload/composable-node-${packages.composable-node.version}-1.x86_64.rpm
            cp ${
              make-bundle "toDEB" packages.composable-node
            }/*.deb release-artifacts/to-upload/composable-node_${packages.composable-node.version}-1_amd64.deb
            cp ${packages.composable-node-image} release-artifacts/composable-image

            cp ${
              make-bundle "toRPM" packages.composable-testfast-node
            }/*.rpm release-artifacts/to-upload/composable-testfast-node-${packages.composable-testfast-node.version}-1.x86_64.rpm
            cp ${
              make-bundle "toDEB" packages.composable-testfast-node
            }/*.deb release-artifacts/to-upload/composable-testfast-node_${packages.composable-testfast-node.version}-1_amd64.deb
            cp ${
              make-bundle "toDockerImage" packages.composable-testfast-node
            } release-artifacts/composable-testfast-node-docker-image

            echo "Devnet"
            cp ${packages.devnet-image} release-artifacts/devnet-image

            echo "Bridge"
            cp ${packages.hyperspace-composable-polkadot-picasso-kusama-image} release-artifacts/hyperspace-composable-polkadot-picasso-kusama-image


            echo "CosmWasm tools"
            cp ${
              make-bundle "toRPM" packages.ccw
            }/*.rpm release-artifacts/to-upload/ccw-${packages.ccw.version}-1.x86_64.rpm
            cp ${
              make-bundle "toDEB" packages.ccw
            }/*.deb release-artifacts/to-upload/ccw_${packages.ccw.version}-1_amd64.deb

            # Checksum everything
            cd release-artifacts/to-upload
            sha256sum ./* > checksums.txt
          '';
        };

      };

    };
}
