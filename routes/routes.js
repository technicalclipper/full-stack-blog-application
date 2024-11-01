import express from "express";
import {
    addblog_to_db,
    retrieve_from_db,
    retrieve_noblogs_db,
    deleteblog_from_db,
    retrieve_singlerow_db,
    change_valueof_row_db,
} from "../db/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await retrieve_from_db();
    const no_of_blogs = await retrieve_noblogs_db();
    res.render("index", { no: no_of_blogs, arr: data });
});

router.get("/add", (req, res) => {
    res.render("add.ejs");
});

router.post("/send", (req, res) => {
    const data = req.body;
    addblog_to_db(data);
    res.status(200).send("OK");
});

router.delete("/delete/:id", async (req, res) => {
    const blogId = parseInt(req.params.id);
    if (blogId >= 0) {
        await deleteblog_from_db(blogId);
        res.status(200).send("Blog post deleted");
    } else {
        res.status(404).send("Blog post not found");
    }
});

router.get("/edit/:id", async (req, res) => {
    const blogId = parseInt(req.params.id);
    const data = await retrieve_singlerow_db(blogId);
    res.render("edit.ejs", { no: data.no, heading: data.heading, content: data.content });
});

router.post("/change", (req, res) => {
    const { index, heading, content } = req.body;
    change_valueof_row_db(index, heading, content);
    res.status(200).send("OK");
});

export default router;
