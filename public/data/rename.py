#! /usr/bin/env python

'''
用法: 把所有图片放到对应的文件夹里(public/data/图片集名/渲染方式/), 
全部放好之后把rename.py放在public/data目录下,
python rename.py
'''

import os

# DATASETS = ["Vortex", "Five Jets", "Ionization", "Tornado", "Tangaroa"]
# MODES = ["IR", "DVR"]
DATASETS = ["Five Jets"]
MODES = ["DVR"]

# I assume the original images are named in following way:
# (for IR imgs)  save-timestep-XX-iso-XX-theta-XX-phi-XX.png
# (for DVR imgs) save-timestep-XX-theta-XX-phi-XX.png
if __name__ == '__main__':
    for dset in DATASETS:
        for mode in MODES:
            path = os.path.join(dset, mode)
            for fname in os.listdir(path):
                if not fname.endswith(".png"):
                    print(f"File '{path}/{fname}' is not an image. Suggest to remove it.")
                    continue
                fname_splitted = fname.removesuffix(".png").split("-")
                try:
                    ts = fname_splitted[fname_splitted.index("timestep") + 1]
                    theta = str(int(float(fname_splitted[fname_splitted.index("theta") + 1])))
                    phi = str(int(float(fname_splitted[fname_splitted.index("phi") + 1])))
                except ValueError:
                    print(f"File '{path}/{fname}' has already been renamed.")
                    continue

                old = os.path.join(path, fname)
                new = "-".join([ts, theta, phi]) + ".png"
                new = os.path.join(path, new)
                os.rename(old, new)