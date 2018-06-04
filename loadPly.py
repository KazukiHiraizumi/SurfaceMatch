#!/usr/bin/python

import cv2
import numpy as np

mat=cv2.ppf_match_3d.loadPLYSimple('model.ply',0)
print mat

