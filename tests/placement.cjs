const assert=require('node:assert/strict');
const {placementQuestions,nextStep}=require('../.learning-test/lib/placement.js');
const {grades}=require('../.learning-test/lib/learning-content.js');
for(const g of grades){const qs=placementQuestions(g.id);assert.equal(qs.length,4,g.id+' has 4 questions');for(const q of qs){assert.ok(q.prompt&&q.options.length>=2&&q.answer>=0&&q.answer<q.options.length);assert.equal(q.index,3,'uses a bank question');}}
const S=(grade,correct)=>({grade,correct,total:4});
assert.deepEqual(nextStep([S('3',4)]),{done:false,level:'4'});
assert.deepEqual(nextStep([S('3',4),S('4',1)]),{done:true,suggest:'3'});
assert.deepEqual(nextStep([S('3',1)]),{done:false,level:'2'});
assert.deepEqual(nextStep([S('3',1),S('2',3)]),{done:true,suggest:'2'});
assert.deepEqual(nextStep([S('6',4)]),{done:true,suggest:'6'});
assert.deepEqual(nextStep([S('pre',0)]),{done:true,suggest:'pre'});
assert.deepEqual(nextStep([S('k',1),S('pre',2)]),{done:true,suggest:'pre'});
assert.deepEqual(nextStep([S('2',4),S('3',4),S('4',3),S('5',4)]),{done:true,suggest:'5'},'stops after four rounds');
assert.deepEqual(nextStep([S('6',0),S('5',0),S('4',0),S('3',0)]),{done:true,suggest:'2'});
console.log('Passed: level check has 4 fresh questions at every level and moves up, down and stops correctly.');
