const { Population } = require('./genetics')
const EmptyScheduele = require('./models/empty_scheduele')
const ScheduelingOption = require('./models/schedueling_option')
const { fitness, desiredFitness } = require('./fitness')

exports.scheduele = options => {
	const emptyScheduele = new EmptyScheduele(options)
	const option = new ScheduelingOption(emptyScheduele)
	const population = new Population({ ChromosomeClass: ScheduelingOption, chromosomeInput: emptyScheduele, fitness, desiredFitness })
	return population.run()
}
