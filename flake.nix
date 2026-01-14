{
  description = "tree-sitter-nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    flake-utils.url = "github:numtide/flake-utils";
	};

  outputs = { self, nixpkgs, flake-utils }: (
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        inherit (pkgs) lib;

      in
      {
				devShells.default = pkgs.mkShell {
					packages = [
						pkgs.nodejs
						pkgs.python3

						pkgs.tree-sitter
						pkgs.editorconfig-checker

						pkgs.rustc
						pkgs.cargo

						pkgs.emscripten

						# Formatters
						pkgs.treefmt
						pkgs.nixpkgs-fmt
						pkgs.nodePackages.prettier
						pkgs.rustfmt
						pkgs.clang-tools
					];
				};
			}
		)
	);
}
