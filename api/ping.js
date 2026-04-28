import express from 'express';
import mongoose from 'mongoose';

export default (req, res) => {
  res.json({
    express_ok: !!express,
    mongoose_ok: !!mongoose,
    mongo_uri_set: !!process.env.MONGO_URI,
  });
};
