#!/usr/bin/python

import cv2
import numpy as np

modelp=cv2.ppf_match_3d.loadPLYSimple('model.ply',0)
print modelp

detector=cv2.ppf_match_3d.PPF3DDetector(0.025, 0.05)
detector.trainModel(modelp)