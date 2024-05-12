import { query } from "express";
import Hotel from "../models/Hotel";
import User from "../models/User";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
};

export const updatedHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {$new: true}
        );
    } catch (error) {
        next(err);
    }
};

export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (error) {
        next(err);
    }
};

export const getHotels = async (req, res, next) => {
    const {min, max, ...others} = req.query;
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt:min | 1, $lt: max || 999},
        }).limit(query.limit);
        res.status(200).json(hotels);
    } catch (error) {
        next(err);
    }
};

