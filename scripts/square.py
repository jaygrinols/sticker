from PIL import Image, ImageOps
import os

# edit these values
directory = "./productwatermark/misc"
outdirectory = "./misc"

os.mkdir(outdirectory)

#border: (left, top, right, bottom)
for imagepath in os.listdir(directory):
    inputpath = os.path.join(directory, imagepath)
    img = Image.open(inputpath)
    outpath = os.path.join(outdirectory, imagepath)
    if img.size[0] > img.size[1]:
        expansion = img.size[0] - img.size[1]
        if expansion%2 == 0:
            img = ImageOps.expand(img, border=(0, expansion//2, 0, expansion//2))
        else:
            img = ImageOps.expand(img, border=(0, expansion//2 + 1, 0, expansion//2))
    else:
        expansion = img.size[1] - img.size[0]
        if expansion%2 == 0:
            img = ImageOps.expand(img, border=(expansion//2, 0, expansion//2, 0))
        else:
            img = ImageOps.expand(img, border=(expansion//2 + 1, 0, expansion//2,0))
    print(imagepath, img.size)
    img.save(outpath)
