{ self, ... }: {
  perSystem = { config, self', inputs', pkgs, lib, system, crane
    , systemCommonRust, subnix, ... }:
    let
      buildPolkadotNode = { name, repo, owner, rev, hash, outputHashes, }:
        pkgs.rustPlatform.buildRustPackage (subnix.subenv // rec {
          inherit name;
          cargoLock = {
            lockFile = "${src}/Cargo.lock";
            inherit outputHashes;
          };
          src = pkgs.fetchgit {
            url = "https://github.com/${owner}/${repo}.git";
            inherit rev;
            sha256 = hash;
            fetchSubmodules = false;
          };
          meta = { mainProgram = "polkadot"; };
        });
      cargo-lock = builtins.fromTOML (builtins.readFile ../../code/Cargo.lock);
      rococo-runtime-dep = builtins.head
        (builtins.filter (x: x.name == "rococo-runtime") (cargo-lock.package));
      rococo-runtime-commit =
        builtins.elemAt (builtins.split "#" rococo-runtime-dep.source) 2;

      mkRelayRuntime = url: hash:
        pkgs.stdenv.mkDerivation {
          name = "relay-runtime";
          dontUnpack = true;
          src = pkgs.fetchurl {
            inherit url;
            inherit hash;
          };
          installPhase = ''
            mkdir -p $out/lib
            cp $src $out/lib/relay_runtime.compact.compressed.wasm
          '';
        };

    in {
      packages = {
        rococo-runtime-from-dep = mkRelayRuntime
          "https://github.com/paritytech/polkadot/releases/download/v0.9.38-rc12/rococo_runtime-v9381.compact.compressed.wasm"
          "sha256-Qh8oa+Y7LbGvXBXdHFarC81QGARsydvjzlPvOiNK+Xw=";

        rococo-runtime-on-parity = mkRelayRuntime
          "https://github.com/paritytech/polkadot/releases/download/v0.9.39/rococo_runtime-v9390.compact.compressed.wasm"
          "sha256-eUK9jF8gXbYVtynCXevpJixBBN2gQEnVfyOp3kwTrt8=";
        kusama-runtime-on-parity = mkRelayRuntime
          "https://github.com/paritytech/polkadot/releases/download/v0.9.38-rc12/kusama_runtime-v9381.compact.compressed.wasm"
          "sha256-LTKYGGMyQj+hzpp+9DvpPExzwiukRHQBA+e4DDAjBto=";

        westend-runtime-on-parity = mkRelayRuntime
          "https://github.com/paritytech/polkadot/releases/download/v0.9.40/westend_runtime-v9401.compact.compressed.wasm"
          "sha256-9FbZ5moShA+0VB54cwGebiYuKLNSruWYSwJ0gDOHbCU=";
        polkadot-runtime-on-parity = mkRelayRuntime
          "https://github.com/paritytech/polkadot/releases/download/v0.9.37/polkadot_runtime-v9370.compact.compressed.wasm"
          "sha256-n8+2GpqqU/kHderUqea4Q7yv4UmsESw25laH1/oZryE=";

        polkadot-node-from-dep = buildPolkadotNode rec {
          name = "polkadot-node-from-dep";
          repo = "polkadot";
          owner = "paritytech";
          rev = rococo-runtime-commit;
          hash = "sha256-uoz3x0I0608aak/g/UZRjnmH3r08ffURzgxQfvZpmMs=";
          outputHashes = {
            "beefy-gadget-4.0.0-dev" =
              "sha256-3zOEG4ER0UQK3GRctZw6TgkX/8Ydk1ynU8N6vlepnHw=";
            "sub-tokens-0.1.0" =
              "sha256-GvhgZhOIX39zF+TbQWtTCgahDec4lQjH+NqamLFLUxM=";
          };
        };

        polkadot-node-on-parity-rococo = buildPolkadotNode rec {
          name = "polkadot-node-on-parity-rococo";
          repo = "polkadot";
          owner = "paritytech";
          rev = "e203bfb396ed949f102720debf32fb98166787af";
          hash = "sha256-+rGrAyQH//m6xFiUstDiZKhvHq928rs36TajT/QxrKM=";
          outputHashes = {
            "sub-tokens-0.1.0" =
              "sha256-GvhgZhOIX39zF+TbQWtTCgahDec4lQjH+NqamLFLUxM=";
            "binary-merkle-tree-4.0.0-dev" =
              "sha256-ngtW11MGs+fcuCp9J5NH+dYJeK4YM5vWpRk0OuLYHus=";
          };
        };

        polkadot-node-on-parity-westend = buildPolkadotNode rec {
          name = "polkadot-node-on-parity-westend";
          repo = "polkadot";
          owner = "paritytech";
          rev = "e203bfb396ed949f102720debf32fb98166787af";
          hash = "sha256-+rGrAyQH//m6xFiUstDiZKhvHq928rs36TajT/QxrKM=";
          outputHashes = {
            "sub-tokens-0.1.0" =
              "sha256-GvhgZhOIX39zF+TbQWtTCgahDec4lQjH+NqamLFLUxM=";
            "binary-merkle-tree-4.0.0-dev" =
              "sha256-ngtW11MGs+fcuCp9J5NH+dYJeK4YM5vWpRk0OuLYHus=";
          };
        };

        polkadot-node-on-parity-kusama = buildPolkadotNode rec {
          name = "polkadot-node-on-parity-kusama";
          repo = "polkadot";
          owner = "paritytech";
          rev = "e203bfb396ed949f102720debf32fb98166787af";
          hash = "sha256-+rGrAyQH//m6xFiUstDiZKhvHq928rs36TajT/QxrKM=";
          outputHashes = {
            "sub-tokens-0.1.0" =
              "sha256-GvhgZhOIX39zF+TbQWtTCgahDec4lQjH+NqamLFLUxM=";
            "binary-merkle-tree-4.0.0-dev" =
              "sha256-ngtW11MGs+fcuCp9J5NH+dYJeK4YM5vWpRk0OuLYHus=";
          };
        };

        polkadot-node-on-parity-polkadot = buildPolkadotNode rec {
          name = "polkadot-node-on-parity-polkadot";
          repo = "polkadot";
          owner = "paritytech";
          rev = "e203bfb396ed949f102720debf32fb98166787af";
          hash = "sha256-+rGrAyQH//m6xFiUstDiZKhvHq928rs36TajT/QxrKM=";
          outputHashes = {
            "sub-tokens-0.1.0" =
              "sha256-GvhgZhOIX39zF+TbQWtTCgahDec4lQjH+NqamLFLUxM=";
            "binary-merkle-tree-4.0.0-dev" =
              "sha256-ngtW11MGs+fcuCp9J5NH+dYJeK4YM5vWpRk0OuLYHus=";
          };
        };

        polkadot-live-runtime-node = buildPolkadotNode rec {
          name = "polkadot-live-runtime-node";
          repo = "polkadot";
          owner = "paritytech";
          rev = "645723987cf9662244be8faf4e9b63e8b9a1b3a3";
          hash = "sha256-TTi4cKqQT/2ZZ/acGvcilqTlh2D9t4cfAtQQyVZWdmg=";
          outputHashes = {
            "beefy-gadget-4.0.0-dev" =
              "sha256-MUUH5v6CKuzDBIXYlJLDFVz6WfaVllzxO9afvWeUZXY=";
            "sub-tokens-0.1.0" =
              "sha256-GvhgZhOIX39zF+TbQWtTCgahDec4lQjH+NqamLFLUxM=";
          };
        };
      };
    };
}
