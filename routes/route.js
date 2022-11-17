const express = require('express')
const router = express.Router()
const Alarm = require('../models/model')

// Getting all
router.get('/', async (req, res) => {
  try {
    const alarms = await Alarm.find()
    res.json(alarms)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getAlarm, (req, res) => {
  res.json(res.alarm)
})

// Creating one
router.post('/', async (req, res) => {
  const alarm = new Alarm({
    alarmName: req.body.alarmName,
    alarmTime: req.body.alarmTime
  })
  try {
    const newAlarm = await alarm.save()
    res.status(201).json(newAlarm);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getAlarm, async (req, res) => {
  if (req.body.alarmName != null) {
    res.alarm.alarmName = req.body.alarmName
  }
  if (req.body.alarmTime != null) {
    res.alarm.alarmTime = req.body.alarmTime
  }
  try {
    const updatedAlarm = await res.alarm.save();
    res.json(updatedAlarm);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getAlarm, async (req, res) => {
  try {
    await res.alarm.remove()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getAlarm(req, res, next) {
  let alarm;
  try {
    alarm = await Alarm.findById({ _id: req.params.id });
    if (alarm == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.alarm = alarm;
  next();
}

module.exports = router