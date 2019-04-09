window.addEventListener("load",initialiser);const DURATION_WRITING=75,DURATION_UNIT="minutes",SECOND=moment.duration(1,"seconds");var listening_duration=moment.duration(DURATION_LISTENING,DURATION_UNIT);function initialiser(e){if(void 0!==document.getElementById("profile-tests")){var t={valueNames:["date","test","student","score"]};new List("profile-tests",t)}if(void 0!==document.getElementById("tests")){t={valueNames:["name","part"]};new List("tests",t)}if(void 0!==document.getElementById("games")){t={valueNames:["date","student","score"]};new List("games",t)}if(void 0!==document.getElementById("students")){t={valueNames:["matricule","student","course","passed"]};new List("students",t)}if(null!==document.getElementsByClassName("js-part-close"))for(var n=document.getElementsByClassName("js-part-close"),r=0;r<n.length;r++)n[r].addEventListener("click",function(){this.parentNode.classList.toggle("part-hide")?(this.innerHTML='<i class="fas fa-chevron-down fa-2x"></i>',this.title="Open"):(this.innerHTML='<i class="fas fa-times fa-2x"></i>',this.title="Close")});var s;null!=document.getElementById("test")&&document.querySelectorAll('#test input[type="radio"]').forEach(function(e){e.addEventListener("change",function(){var t=e.parentElement.parentElement.parentElement.parentElement,n=t.dataset.part,r=document.getElementById("part_"+n).querySelectorAll('input[type="radio"]'),s=document.getElementById("part_"+n).querySelectorAll('input[type="radio"]:checked'),i=t.querySelectorAll('input[type="radio"]').length;if(s.length==r.length/i){var a=t.parentElement.parentElement;a.classList.contains("part-completed")||a.classList.add("part-completed")}})});if(null!==document.getElementById("player")){var i=document.querySelector("#player audio"),a=i.dataset.sources.split(",");r=1;timer.innerText=listening_duration.format("hh:mm:ss",{trim:!1}),document.getElementById("play").addEventListener("click",function(e){this.removeEventListener("click",arguments.callee),document.querySelector(".btn-play").classList.add("btn-play--disabled"),i.play(),s=setInterval(listening,1e3)}),i.addEventListener("ended",function(){r<a.length?(this.src=a[r],r++,this.play()):(clearInterval(s),timer.innerText="00:00:00",document.querySelectorAll(".fa-volume-up").forEach(function(e){e.parentNode.parentNode.querySelectorAll('input[type="radio"]').forEach(function(e){0==e.checked&&(e.disabled=!0)})}),null!=document.querySelector(".fa-glasses")&&writing(s))})}document.querySelectorAll("#test .img-preview").forEach(function(e){e.addEventListener("click",function(){var e=this.querySelector("img");e.classList.contains("on-preview")?(e.classList.remove("on-preview"),document.querySelector(".preview").style.backgroundImage="",document.querySelector(".preview").classList.add("hidden")):(document.querySelectorAll(".on-preview").forEach(function(e){e.classList.remove("on-preview")}),e.classList.add("on-preview"),document.querySelector(".preview").style.backgroundImage="url("+e.src+")",document.querySelector(".preview").classList.remove("hidden"))},!1),document.body.addEventListener("click",function(e){e.target.closest(".preview")||e.target.closest(".img-preview")||document.querySelector(".preview").classList.contains("hidden")||(document.querySelectorAll(".on-preview").forEach(function(e){e.classList.remove("on-preview")}),document.querySelector(".preview").style.backgroundImage="",document.querySelector(".preview").classList.add("hidden"))},!1)})}function listening(){var e=document.getElementById("timer");listening_duration.subtract(SECOND),e.innerText=listening_duration.format("hh:mm:ss",{trim:!1})}function writing(e){var t=document.getElementById("timer"),n=moment.duration(DURATION_WRITING,DURATION_UNIT);e=setInterval(function(){n=n.subtract(SECOND),t.innerText=n.format("hh:mm:ss",{trim:!1}),n.asSeconds()<=0&&(clearInterval(e),document.querySelectorAll('input[type="radio"]').forEach(function(e){0==e.checked&&(e.disabled=!0)}))},1e3)}window.addEventListener("load",function(){if(null!==document.getElementById("progression")){var e=document.getElementById("progression").getContext("2d");new Chart(e,{type:"line",data:{labels:JSON.parse("["+chart_axisX.replace(/&quot;/g,'"')+"]"),datasets:Object.values(JSON.parse(chart_axisY.replace(/&quot;/g,'"')))},options:{title:{display:!0,text:"Progression sur les différents types d'exercices"},scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}})}if(null!==document.getElementById("challenges"))e=document.getElementById("challenges").getContext("2d"),new Chart(e,{type:"line",data:{labels:JSON.parse("["+chart_axisX.replace(/&quot;/g,'"')+"]"),datasets:[{label:"Challenges",data:chart_axisY.replace("[","").replace("]","").split(","),backgroundColor:"transparent",borderColor:"#4b3f72"}]},options:{title:{display:!0,text:"Progression sur les challenges"},scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}})});
