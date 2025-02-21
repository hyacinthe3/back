import Contact from "../models/contactModal.js";

export const createContact = async (req, res) => {
    try {
        const { names, email, subject, message, phone } = req.body;
        const newContact = new Contact({ names, email, subject, message, phone });

        await newContact.save();

        res.status(201).json({ success: true, message: "contact created successfully", Contact: newContact });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

export const getAllContact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({ success: true, contacts })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

export const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contacts = await Contact.findById(id);
        if (!contacts) {
            return res.status(404).json({ success: false, message: "contact not found" });
        }
        res.status(200).json({ success: true, contacts });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

}

export const deleteContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ success: false, message: "contact not found" });
        }
        res.status(200).json({ success: true, message: "contact deleted successfully" });
    }
    catch (error) {
        res.status(200).json({ success: false, message: "server error", error: error.message });

    }
}

export const updateContactById=async(req,res)=>{
    try {
        const { id } = req.params;
        const updatedData = await Contact.findByIdAndUpdate(id,req.body);
        if (!updatedData) {
            return res.status(404).json({ success: false, message: "contact not found" });
        }
        res.status(200).json({ success: true, message: "contact updated successfully" });
    }
    catch (error) {
        res.status(200).json({ success: false, message: "server error", error: error.message });

    }
}