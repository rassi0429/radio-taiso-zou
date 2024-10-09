import "dotenv/config";

import {PrismaClient} from "@prisma/client";
import express from "express";
import {sendZouCoinAdmin} from "./bank";

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("radio taiso zo API");
});

app.get("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            exerciseRecords: true
        }
    });
    if (!user) {
        res.status(404).json({error: "user not found"});
        return
    }
    res.json(user);
})

app.get("/exercise", async (req, res) => {
    const exercises = await prisma.exercise.findMany();
    res.json(exercises);
});

app.get("/exercise/:exerciseId/:userId", async (req, res) => {
    const userId = req.params.userId;
    const exerciseId = req.params.exerciseId;
    const exercises = await prisma.exerciseRecord.findMany({
        where: {
            userId,
            ExerciseId: Number(exerciseId)
        }
    });
    res.json(exercises);
})

app.post("/exercise/:exerciseId/:userId", async (req, res) => {
    const userId = req.params.userId;
    const exerciseId = req.params.exerciseId;

    let user = await prisma.user.findUnique({
        where: {id: userId}
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                id: userId
            }
        });
    }

    const exercise = await prisma.exercise.findUnique({
        where: {id: Number(exerciseId)}
    });

    if (!exercise) {
        res.status(404).json({error: "exercise not found"});
        return;
    }

    const exerciseRecord = await prisma.exerciseRecord.create({
        data: {
            ExerciseId: Number(exerciseId),
            userId: user.id
        }
    });

    await sendZouCoinAdmin(userId, exercise.reward, exercise.name + " 報酬")

    res.json(exerciseRecord);
})

app.post("/admin/exercise", async (req, res) => {
    const {name, reward} = req.body;
    const exercise = await prisma.exercise.create({
        data: {
            name,
            reward
        }
    });
    res.json(exercise);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});