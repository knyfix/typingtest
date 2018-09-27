var timeLeft = 0;
var timer = 0;

function startTest(){
	testDuration = document.getElementById('testDuration').value;
	if(testDuration==0){
		alert('Please select the test duration');
		return;
		}
	textSample = document.getElementById('textSample').value;
	if(textSample==0){
		alert('Please select the text sample');
		return;
		}
	document.getElementById('sampleText').value = document.getElementById('sampleText'+textSample).value;
	document.getElementById('typedText').value = '';
	document.getElementById('typedText').disabled = 1;
	document.getElementById('testResults').value = '';
	document.getElementById('launcher').style.display='none';
	document.getElementById('tester').style.display='block';
	document.getElementById('messageGauge').value = 'Ready';
	document.getElementById('retakeTest').style.display='none';
	document.getElementById('pauseTest').style.display='none';
	document.getElementById('unpauseTest').style.display='none';
	document.getElementById('stopTest').style.display='none';
	delayEvt('Steady',1000);
	}

function delayEvt(str,timeout){
	if(str=='Steady')
		setTimeout("delayEvt('Go',1000)",1000);
	if(str=='Go'){
		document.getElementById('messageGauge').value = 'Steady';
		setTimeout("delayEvt('startTest',1000)",1000);
		}
	if(str=='startTest'){
		document.getElementById('messageGauge').value = 'Go';
		timeLeft = document.getElementById('testDuration').value;
		document.getElementById('typedText').disabled = 0;
		document.getElementById('typedText').focus();
		document.getElementById('retakeTest').style.display='none';
		document.getElementById('pauseTest').style.display='inline';
		document.getElementById('unpauseTest').style.display='none';
		document.getElementById('stopTest').style.display='inline';
		setTimeout("delayEvt('tick',1000)",1000);
		}
	if(str=='tick'){
		if(timeLeft==0){
			stopTest();
			return;
			}
		timeLeft--;
		document.getElementById('messageGauge').value = Math.floor(timeLeft/60)+':'+(timeLeft%60<10?'0'+timeLeft%60:timeLeft%60);
		timer = setTimeout("delayEvt('tick',1000)",1000);
		}
	}

function stopTest(){
	clearTimeout(timer);
	document.getElementById('typedText').disabled = 1;

	var sampleWords = document.getElementById('sampleText').value.replace(/\n/g,' ').split(/ /);
	var typedWords = document.getElementById('typedText').value.replace(/\n/g,' ').split(/ /);
	var mistypedWords = 0;
	for(var i=0; i<(typedWords.length-1); i++)
		if(sampleWords[i]!=typedWords[i])
			mistypedWords++;
	document.getElementById('testResults').value = 'Words Per Minute: '+(typedWords.length/(document.getElementById('testDuration').value-timeLeft)*60)+"\r\nMistyped Words: "+mistypedWords+"\r\nErrors: "+Math.round(mistypedWords/typedWords.length*100)+'%';
	document.getElementById('retakeTest').style.display='inline';
	document.getElementById('pauseTest').style.display='none';
	document.getElementById('unpauseTest').style.display='none';
	document.getElementById('stopTest').style.display='none';
	}

function retakeTest(){
	document.getElementById('launcher').style.display='block';
	document.getElementById('tester').style.display='none';
	}

function pauseTest(){
	clearTimeout(timer);
	document.getElementById('retakeTest').style.display='none';
	document.getElementById('pauseTest').style.display='none';
	document.getElementById('unpauseTest').style.display='inline';
	document.getElementById('stopTest').style.display='none';
	}

function unpauseTest(){
	delayEvt('tick',1000);
	document.getElementById('typedText').focus();
	document.getElementById('retakeTest').style.display='none';
	document.getElementById('pauseTest').style.display='inline';
	document.getElementById('unpauseTest').style.display='none';
	document.getElementById('stopTest').style.display='inline';
	}