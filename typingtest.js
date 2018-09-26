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
	document.getElementById('testResults').value = '';
	document.getElementById('launcher').style.display='none';
	document.getElementById('tester').style.display='block';
	document.getElementById('timeLeftGauge').value = 'Ready';
	}

function retakeTest(){
	document.getElementById('launcher').style.display='block';
	document.getElementById('tester').style.display='none';
	}

function pauseTest(){
	}

function unpauseTest(){
	}

function stopTest(){
	retakeTest();
	}
