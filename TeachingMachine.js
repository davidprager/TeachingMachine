/*
 * File: TeachingMachine.js
 * ------------------------
 * This program executes a programmed instruction course.  The questions
 * and answers appear in the index.html file in the following form:
 *
 *    <div style="display:none;">
 *      <question id="...">
 *        . . . text of the question . . .
 *        <answer response="..." nextQuestion="..." />
 *        . . . more <answer> tags . . .
 *      </question>
 *      . . . more <question> tags . . .
 *    </div>
 */

"use strict";

/* Main program */

function TeachingMachine() {
   let questionXML = document.getElementsByTagName("question")[0];
   askQuestion();

   function askQuestion() {
      console.write(questionXML.innerHTML + "<br />");
      console.requestInput("> ", checkAnswer);
   }

   function checkAnswer(str) {
      let answerXML = getAnswerXML(str.toLowerCase());
      if (answerXML === null) {
         console.log("I don't understand that response.");
      } else {
         let nextQuestionId = answerXML.getAttribute("nextQuestion");
         if (nextQuestionId === "EXIT") return;
         questionXML = document.getElementById(nextQuestionId);
      }
      askQuestion();
   }

   function getAnswerXML(str) {
      let answers = questionXML.getElementsByTagName("answer");
      for (let i = 0; i < answers.length; i++) {
         let answerXML = answers[i];
         let response = answerXML.getAttribute("response").toLowerCase();
         if (response === str || response === "*") return answerXML;
      }
      return null;
   }

}
