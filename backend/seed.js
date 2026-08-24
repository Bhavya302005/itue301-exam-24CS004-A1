require('dotenv').config();
const mongoose = require('mongoose');
const Member = require('./models/Member');
const Trainer = require('./models/Trainer');
const ClassBooking = require('./models/ClassBooking');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    await Member.deleteMany({});
    await Trainer.deleteMany({});
    await ClassBooking.deleteMany({});

    await Member.create({
      name: 'Bhavya Amin',
      email: 'bhavya@fitzone.com',
      phone: '9876543210',
      membershipType: 'premium',
    });

    await Trainer.create([
      {
        name: 'Rahul Mehta',
        specialization: 'Strength Training',
        available: true,
      },
      {
        name: 'Neha Patel',
        specialization: 'Yoga',
        available: true,
      },
      {
        name: 'Aarav Shah',
        specialization: 'Cardio',
        available: false,
      }
    ]);

    console.log('Seed data inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
