## NeRVI-viz-tool
This app is designed for comparative image visualization for the NeRVI project. Built with React.js 18.1.0.

## Data set preparation
Put images under `public/data/$d/$m/`.
- `$d` is in (`Vortex`, `Five Jets`, `Ionization`, `Tangaroa`, `Tornado`).
- `$m` is in (`IR`, `DVR`).  
Each render type of each data set shall occupy a directory. For example, the IR images for Vortex data set would be put in `public/data/Vortex/IR/`, and the DVR images would be put in `public/data/Vortex/DVR`.  
Naming wise, each image should be named as `$ts-$t-$p.png`, where `$ts` is the time step, `$t` is the theta angle, `$p` is the phi angle. For example, the vortex image corresponding to time step 3, theta 90, phi 90 shall be named `public/data/Vortex/3-90-90.png`.

## How to run
1. Clone the repository to your local machine.
2. Navigate to the repository's root directory.
3. Run `npm start` from the terminal.
