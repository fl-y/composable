## Guide

1. Use dedicated non cloud hardware for heavy jobs (32 CPUs) for Linux
2. Use dedicated non cloud hardware for Mac jobs
3. Use one to one hardware as used in production for benchmarks
4. Use Nix native services (Hercules, Nixbuild, Hydra) for immutable pure nix builds (they are fastest for Nix and with best debugging experience)
5. Use default GH runners for super light jobs (2 CPU cores).
6. Use BlueJet or GH Larger runners for light jobs (4-8 CPU cores).
7. Observer jobs via dashboards (Trunk) and optimize

## Image

```bash
installimage -i images/Ubuntu-2204-jammy-amd64-base.tar.gz -G yes -a -n hetzner-ax161-{N}`
```

## Sudo

```bash
set -o errexit
adduser actions-runner --disabled-password && passwd --delete actions-runner
sh <(curl -L https://nixos.org/nix/install) --daemon --yes && source /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh
cat > /etc/nix/nix.conf << EOF
    # keep-derivations = true
    # keep-outputs = true
    allow-import-from-derivation = true
    auto-optimise-store = true
    cores = 64
    experimental-features = nix-command flakes
    gc-reserved-space = 18388608
    http-connections = 32
    http2 = true
    max-free = 1000000000000
    max-jobs = 1
    min-free = 100000000000
    narinfo-cache-negative-ttl = 0
    sandbox = relaxed
    system-features = kvm     
    trusted-users = root actions-runner
EOF
service nix-daemon restart
apt-get update && apt-get install apt-transport-https qemu-system-x86 ca-certificates curl gnupg software-properties-common --yes
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update && apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin --yes
usermod --append --groups docker actions-runner && service docker restart
usermod --append --groups kvm actions-runner && chmod 666 /dev/kvm
service nix-daemon restart && service docker restart
mkdir --parents /home/actions-runner/ 
cd /home/actions-runner/
su actions-runner
```

## User

```bash
nix profile install "nixpkgs#git" "nixpkgs#git-lfs" "nixpkgs#cachix" "nixpkgs#process-compose" "nixpkgs#dasel" "nixpkgs#nix-tree"
```

### x84_64

```bash
curl -o actions-runner-linux-x64-2.307.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.307.1/actions-runner-linux-x64-2.307.1.tar.gz
tar xzf ./actions-runner-linux-x64-2.307.1.tar.gz

./config.sh --url https://github.com/ComposableFi/composable --token $TOKEN --name hetzner-ax161-$MACHINE_ID --labels x86_64-linux-32C-128GB-2TB --work _work
```

### aarch64

```bash
curl -o actions-runner-linux-arm64-2.307.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.307.1/actions-runner-linux-arm64-2.307.1.tar.gz
tar xzf ./actions-runner-linux-arm64-2.307.1.tar.gz

./config.sh --url https://github.com/ComposableFi/composable --token $TOKEN --name hetzner-rx170-$MACHINE_ID --labels aarch64-linux-80C-128GB-2048GB --work _work
```

## Sudo again

```bash
./svc.sh install actions-runner && ./svc.sh start && systemctl daemon-reload
```

## Notes
 
Sure do not do this in production. Solution is to nixos-generators custom image with public ssh and github runner built in and using `nix rebuild` via ssh on remote to update config (or can use home-manager on ubuntu).