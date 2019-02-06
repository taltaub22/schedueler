module.exports = class EmptyScheduele {

	constructor ({ roomsPerTeam, matchesPerTeam, teams, rooms, tables, judges, refs,
		 timePerRoom, roomCycle, timePerMatch, matchCycle, teamBreaksMinimumLength,
		roomsSchedueleSections, matchesSchedueleSections }) {
		let options = { roomsPerTeam, matchesPerTeam, teams, rooms, tables, judges, refs,
		timePerMatch, matchCycle, timePerRoom, roomCycle, teamBreaksMinimumLength,
		roomsSchedueleSections, matchesSchedueleSections }
		Object.assign(this, options)

		this.calculateUnschedueledSessions()
		this.calculateEmptySlots()
		this.validate()
	}

	calculateUnschedueledSessions () {
		this.sessions = []
		
		this.sessionsPerTeam = []
		this.roomsPerTeam.forEach(roomType => {
			this.sessionsPerTeam.push({ requiredSlotType: roomType })
		})
		this.matchesPerTeam.forEach(matchName => {
			this.sessionsPerTeam.push({ requiredSlotType: matchName })
		})

		this.teams.forEach(team => { 
			this.sessionsPerTeam.forEach(sessionPerTeam => {
				this.sessions.push({ team, session: sessionPerTeam })
			})
		})
	}

	calculateEmptySlots () {
		this.slots = []
		this.roomsSchedueleSections.forEach(roomsSchedueleSection => {
			for(let time = roomsSchedueleSection.start; time <= roomsSchedueleSection.end; time += this.roomCycle) {
				this.rooms.forEach((roomType, i) => {
					this.slots.push({ start: time, end: time + this.roomCycle, type: roomType, slot: `${roomType} ${i+1}` })
				})
			}
		})
		Object.entries(this.matchesSchedueleSections).forEach(([matchName, matchesSchedueleSection]) => {
			for(let time = matchesSchedueleSection.start; time <= matchesSchedueleSection.end; time += this.matchCycle) {
				for(let i = 0; i < this.tables.length; i++) {
					this.slots.push({ start: time, end: time + this.matchCycle, type: matchName, slot: `Table ${i+1}` })
				}
			}
		})
	}

	validate () {
		if (this.slots.length < this.sessions.length) {
			throw new Error(`Missing ${this.sessions.length - this.slots.length} slots`)
		}
	}

}