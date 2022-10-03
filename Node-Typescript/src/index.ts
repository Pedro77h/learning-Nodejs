/* eslint-disable @typescript-eslint/class-name-casing */

import { Express , Request , Response, Router} from 'express'
import {serverInit} from './server/server'


new serverInit(4030).getApp()

