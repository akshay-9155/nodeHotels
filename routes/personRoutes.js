const express = require('express');
const Person = require('../models/Person');
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const savedData = await newPerson.save();
        console.log("data saved");
        res.status(200).json(savedData);
    } catch (err) {
        console.error("Internal server error" + err);
        res.status(500).json({ error: err })
    }
})

router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.error("Internal server error" + err);
        res.status(500).json({ error: err })
    }
})

router.get("/profile", async (req, res) => {
    try {
        const { id } = req.user;
        const userData = await Person.findById(id);
        res.status(200).json(userData);
    } catch (error) {
        console.error("Internal server error" + err);
        res.status(500).json({ error: err })
    }
})

router.get("/:workType", async (req, res) => {
    try {
        const { workType } = req.params;
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const response = await Person.find({ "work": workType });
            console.log(`All the ${workType}s are: ${response}`);
            res.status(200).json(response);
        } else {
            console.log(`All the ${workType}s are: ${response}`);
            res.status(200).json(response);
        }

    } catch (err) {
        console.log("Item not found");
        res.status(404).json({ "error": "Invalid WORKTYPE" });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedData = await Person.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
        if (!updatedData) {
            res.status(404).json({ "error": "Person not found!" });
        } else {
            console.log("data updated!");
            res.status(200).json(updatedData);
        }

    } catch (err) {
        console.error("Internal server error" + err);
        res.status(500).json({ error: err })
    }

})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedData = await Person.findByIdAndDelete(id);
        if (!deletedData) {
            res.status(404).json({ "error": "Person not found!" });
        } else {
            console.log("Person deleted Successfully!");
            res.status(200).json({ "isDeleted": "true", "deletedPerson": deletedData });
        }
    } catch (err) {
        console.error("Internal server error" + err);
        res.status(500).json({ error: err })
    }
})

module.exports = router;