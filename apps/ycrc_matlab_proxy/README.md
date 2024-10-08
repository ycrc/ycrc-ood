# OOD Interactive Matlab App

This is an Open Ondemand app designed to run the new MATLAB Web UI using MATLAB Proxy. MATLAB Proxy is still in early development and is missing features (Add-On Manager, UI Persistance, etc..). For most users [MATLAB Desktop/XFCE](../matlab-desktop/README.md) is recommended instead.

## Required Software

Here are the basic software requirements:

- [OOD Ruby Initializers](../initializers/README.md)
- [Apptainer](https://apptainer.org/)
- [MATLAB](https://www.mathworks.com/)
  - Version >= 2020b
  - For dependencies see [matlab-deps](https://github.com/mathworks-ref-arch/container-images/tree/master/matlab-deps)
  - This can be containerized or provided via Lmod modules.
- [MATLAB Proxy](https://github.com/mathworks/matlab-proxy)
  - Version >= 0.3.0
  - This is a seperate application by MATHWORKS but not shipped with MATLAB itself
  - Requires "X Virtual Frame Buffer (Xvfb)"
  - This can be containerized or provided via Lmod modules.
    - If containerized then MATLAB itself must be in the same container!

## Site Customizations

To customize this app for other sites/institutions you will need to review the following:

- `form.yml.erb`
  - Value of `cluster:`
  - Any links to documentation.
  - `version:` module entries.
    - It's expected that the module will provide a `$SIF` environment variable.
- `shared/form.yml.erb`
  - Any links to documentation.
- `shared/partitions.json` and `shared/backfill.json`
  - Partition names and values.
- `manifest.yml`
  - links to documentation.
- `template/before.sh`
  - Update the host/HOST assignment to reflect your node names.  We use a '-ib0' to force the usage of specific network so this will break for most other people.
- `template/sif.sh`
  - Calls to apptainer assumes that the nodes apptainer.conf will specify any cluster specific mounts such as home, scratch, and project directories.
