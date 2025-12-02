import Person from "../models/Person.js"; // ✅ default import
import QRCode from "qrcode";

export const createPerson = async (req, res) => {
  try {
    const person = await Person.create(req.body);

    const qrDataURL = await QRCode.toDataURL(
      `http://localhost:5000/api/person/${person.id}`
    );

    person.qrCode = qrDataURL;
    await person.save();

    res.json({ message: "Person created", person });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating person" });
  }
};

export const getPerson = async (req, res) => {
  try {
    const person = await Person.findByPk(req.params.id);
    if (!person) return res.status(404).json({ message: "Not found" });

    res.json(person);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getAllPersons = async (req, res) => {
  try {
    const people = await Person.findAll();
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
