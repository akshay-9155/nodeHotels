const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu')

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newDish = new Menu(data);
        const savedMenu = await newDish.save();
        console.log("Menu saved");
        res.status(200).json(savedMenu);
    } catch (err) {
        console.log("Internal Server Error: " + err);
        res.status(500).json({ "error": err });
    }
})

router.get("/", async (req, res) => {
    try {
        const data = await Menu.find();
        console.log("Menu fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log("Internal Server Error: " + err);
        res.status(500).json({ "error": err });
    }
})

router.delete("/delete/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const deletedItem = await Menu.findOneAndDelete({ "name": name });
        if (!deletedItem) {
            console.log("Item not found");
            res.status(404).send("Item not found!");
        } else {
            console.log("Item deleted!");
            res.status(200).json(deletedItem);
        }
    } catch (err) {
        console.log("Internal Server Error: " + err);
        res.status(500).json({ "error": err });
    }
})

router.put("/order/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const updatedData = await Menu.findOneAndUpdate({ "name": name }, { $inc: { "numSales": 1 } }, { new: true });
        if (!updatedData) {
            console.log("Item not found");
            res.status(404).send("Item not found!");
        } else {
            console.log("Item orderd and numSales updated!");
            res.status(200).json(updatedData);
        }
    } catch (err) {
        console.log("Internal Server Error: " + err);
        res.status(500).json({ "error": err });
    }
})

router.put("/cancelOrder/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const updatedData = await Menu.findOneAndUpdate({ "name": name }, { $inc: { "numSales": -1 } }, { new: true });
        if (!updatedData) {
            console.log("Item not found");
            res.status(404).send("Item not found!");
        } else {
            console.log("Item cancelled and numSales updated!");
            res.status(200).json(updatedData);
        }
    } catch (err) {
        console.log("Internal Server Error: " + err);
        res.status(500).json({ "error": err });
    }
})

router.get("/:taste", async (req, res) => {
    const {taste} = req.params;
    try {
        if (taste == "spicy" || taste == "sweete" || taste == "sour" || taste == "salty"){
            const data = await Menu.find({ "taste": taste });
            res.status(200).json(data);
        }else{
            console.log("Invalid taste");
            res.status(404).json({"error" : "Invalid taste"});
        }
    } catch (err) {
        console.log("Internal Server Error: " + err);
        res.status(500).json({ "error": err });
    }
    
})

module.exports = router;