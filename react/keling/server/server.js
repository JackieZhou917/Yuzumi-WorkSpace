import * as dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'

dotenv.config({
  path: ['.env.local', '.env'],
})
