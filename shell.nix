{ pkgs ? import <nixpkgs> { } }:
with pkgs;

stdenv.mkDerivation {
  name = "webdev-env";
  buildInputs = [
    git
    lessc
    entr
    python38Packages.livereload
  ];
}
