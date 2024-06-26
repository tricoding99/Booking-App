import Room from "../models/Room";
import Hotel from "../models/Hotel";


export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push : { rooms: savedRoom._id},

            });

        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch(err) {
        next(err);
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params._id},
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params._id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params._id},
            });
        } catch (error) {
            next(error);
        }
        res.status(200).json("Room has been deleted.");
    } catch (error) {
        next(error);
    }
};

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params._id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const getRooms = async (req, res , next) => {
    try {
        rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};
