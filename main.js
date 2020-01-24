const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");
const bodyElement = document.getElementById("body");
// const buttons = document.getElementsByClassName("btn");


function startGame() {
  showTextNode(1);
}

var textNode, timer;

function showTextNode(textNodeIndex) {
  // Fait passer d'un node à l'autre à l'aide de textNode.id
  textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  //ajoute la vibration à "... ... ..."
  if (textNodeIndex == 6) {
    textElement.classList.add("vibrate-1");
  }
  //retire la vibration au node d'après
  if (textNodeIndex == 7 || textNodeIndex == 5) {
    textElement.classList.remove("vibrate-1");
  }
  if (textNodeIndex == 14) {
    textElement.classList.add("shake-horizontal");
  }
  else if (textNodeIndex == 15) {
    textElement.classList.remove("shake-horizontal");
  }

  else if (textNodeIndex == 20) {
    console.log("flicker")
    textElement.classList.add("flicker-out-1");
  }
  
  else {
    textElement.classList.remove("flicker-out-1");
  }

  //lance la fonction Type Effect qui fait un effet type Writter dans TextElement 
  timer = typeEffect(textElement,45);
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  if (textNodeIndex < 20) {
  // affiche les boutons / les retire 
  textNode.options.forEach(option => {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        textElement.innerHTML="";
        // permet remettre le timer à 0 à chaque fois que l'on clique sur un bouton pour éviter le bug du texte qui 
        // continue à la page d'après
        clearInterval(timer);
        // permet de selectionner la prochain texte et l'afficher sur le bouton 
        selectOption(option);
      });
      optionButtonsElement.appendChild(button);
  });
}
}

function resetNode(prevNode, clbk) {
  textElement.innerHTML="";
  console.log(timer);
  clearInterval(timer);
  clbk(prevNode);
}


document.getElementById("btn-retour").onclick = function() { 
  
  resetNode(textNode.precedentText,showTextNode);
/*
  var precedentTextNodeId = textNode.precedentText;
  textNode.id = precedentTextNodeId;
  console.log("textnode", textNode);
  console.log("id after", precedentTextNodeId);
  textElement.innerHTML="";
  console.log(textElement);
  var timer = typeEffect(textElement,45);
  textElement.innerText = textNode.text;
  */
}
    
 
  

 
function selectOption(option) {
  const nextTextNodeId = option.nextText;
  textElement.innerHTML="";
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  showTextNode(nextTextNodeId);
}


const textNodes = [
  {
    id: 1,
    precedentText : 1,
    text: `It feels like it's been a long time since you've been at your parents house. Nothing seems to have changed. The smell is the same and the old pictures of your childhood are still there. It seems like your old self is staring at you from the photo. It's a Sunday night and your parents are not here.`,
    options: [
      { text: "Go to your room", nextText: 3 },
      { text: "Go to the kitchen", nextText: 2 }
    ]
  },
  {
    id: 2,
    precedentText : 1,
    text:
      "The kitchen is plunged in the dark. You feel like you want to eat something so you open the fridge. The pale light of the refrigerator lights up the room. You look around you and don't remember feeling like it was once a place where, as a child, you used to finished the jar of Nutella with you finger looked that grim. There is nothing in the fridge except some old mayonnaise and a jar of pickles. You close the door of the fridge.",
    options: [
      {
        text: "Go to your room",
        nextText: 3,
      }
    ]
  },

  {
    id: 3,
    precedentText : 1,
    text:
      "You go up the stairs and open the door to your old childhood room. The light coming from the street through your window makes the shadows of the pushed toys looks like giants monsters on the wall. You quickly turn on the light.",
    options: [
      {
        text: "Go to bed",
        nextText: 5
      },
      { text: "Look around", nextText: 4 }
    ]
  },

  {
    id: 4,
    precedentText : 3,
    text:
      "You see the posters on the wall of what used to be your favorites band. Now the colours are faded. Some toys gathers dust on a shelf. Your bed, already made is in the corner of the room. Your childhood sheets with tiny bears pattern finished to paint the pictures of what used to be your childhood.",
    options: [
      {
        text: "Go to bed",
        nextText: 5
      }
    ]
  },

  {
    id: 5,
    precedentText : 3,
    text:
      "It's already midnight and you feel a little bit oppressed and tensed. You can't put your finger on why you're feeling this way. You decide to go to bed. You put your pyjamas and slide under the icy cold sheets. Now that you are in bed, you notice that there is no heat. You're feeling already tired and decide to go to sleep anyway.",
    options: [
      {
        text: "Sleep",
        nextText: 6
      }
    ]
  },

  {
    id: 6,
    precedentText : 5,
    text: "...  ...  ...",
    options: [
      {
        text: "What's happening ?",
        nextText: 7
      }
    ]
  },

  {
    id: 7,
    precedentText : 6,
    text:
      "You wake up suddenly, you heard a loud noise downstairs and you are freezing. No one but you is suppose to be home tonight.",
    options: [
      {
        text: "Go check downstairs",
        nextText: 9,
      },
      { text: "Stay in your room", nextText: 8 }
    ]
  },

  {
    id: 8,
    precedentText : 7,
    text:
      "You decide that maybe you were dreaming that you heard a noise. You try to go to sleep but it's too cold in your room. You get out of bed and try to turn on the radiator but it doesn't seem to work. Your room is plunged in the dark. You try to find the light switch in the darkness, when you find it and try to switch it, nothing happen. The circuit breaker is downstairs, you're going to freeze if you don't get the heating on. You need to go downstairs.",
    options: [
      {
        text: "Go check downstairs",
        nextText: 9
      }
    ]
    },
      {
        id : 9,
        precedentText : 6,
        text : "You turn on the flashlight on your phone, a ray of harsh white light lights up the room. You open the door of your room and go to the corridor. You squeeze the bannister really hard and slowly go down the creaky stairs. It's pitch black and the only thing you can think about is that sound. Was it real ? Or was it coming from your dream ? You end up at the end of the stairs, where was the sound coming from ?",
        options: [ {
          text: "Go to the living room", nextText: 10,},
          {text: "Go to the kitchen ", nextText:11},
        ]
      },
      {
        id : 10,
        precedentText : 9,
        text : "You walk to the living room. The shutters are close, the only source of light comes from your phone. No way someone could have come in from that room. You turn your phone to look at the old yellowing wallpaper and the dusty ageless furnitures. As you lower your light you notice something strange on the table.",
      options : [
        {text : "Go look", nextText: 12},
        {text : "Go to the kitchen", nextText: 11}
      ],
    },
    {
      id: 11,
      precedentText : 9,
      text : "You walk to the kitchen, go to the sink and let the water run. You just want to splash some water on your face, you need to wake up. You put your hands in the water and quickly remove them. The water is freezing. That does the trick, it snaps you out of your comatose state. You heard a noise and you know it. But first, you need to go to the fusebox, there is no electricity and the battery of your phone is running low. You don't want to be without light in this house.",
      options : [
        {text: "Go to the basement", nextText:13}
      ]
    },
    {
      id: 12,
      precedentText : 10,
      text : "You go towards the table. You notice that there is a strange looking spot on the table. Every piece of furniture is covered with a thin layer of dust but this. You look at it closer. It looks like a handprint, but not an adult one. You put your hand next to the print to compare. It's clearly a child size handprint. Someone was here.",
      options : [
      {text : "Go to the kitchen", nextText:11},
      {text: "Go to the basement", nextText: 13}
    ]
  },
  {
    id: 13,
    precedentText : 9,
    text: "You walk to the door that opens up to the stairway that leads to the basement. You open it and turn your flashlight towards the end of the stairs. The light isn't bright enough to see the end of the stairs. It feels like your are descending into the abyss. A beeping sound just comes from your phone. Your battery is running dangerously low.",
    options : [
      {text : "Go down the stairs", nextText:14}
    ]
  },
    {
      id:14,
      precedentText : 13,
      text:"As you go down the stairs, you feel like the temperature is getting colder and colder. You shriver but you made in downstairs. You look around, there is humidity in the air and a musty smell is coming from the room.",
      options: [
        {text: "Find the fusebox", nextText:15},
        {text: "Look around", nextText:16}
      ]
    },
    {
      id: 15,
      precedentText : 14,
      text:"As you walk to where you think you remember the fusebox could be, you look at the room,  shelves of cardboard boxes. As your eyes are wandering, you see it, the fusebox. You instantly feel relieved. No more cold, no more darkness. You walk towards the fusebox, and try to light it. That the moment your phone decide to die. It's pitch black. Your breathing start to get heavy and then, finally, your remember.",
      options : [
        {text: "Remember", nextText:17}
      ]
    },
    {
      id: 16,
      precedentText : 14,
      text: "The basement seems be used as a storage room. There is a lot of shelves full of cardboard boxes. You feel curious and open one of the box. There seems to be a lot of junk but a thing catch your attention. You grab it. It's an old toy from your childhood. You were attracted by the still shiny color of a rubik's cube. You used to spend hours on it as a kid, trying to make all the sides the same color. And then it hits you, the basement, the rubick's cube, the cold, the loud sound.",
      options : [
        {text: "Remember", nextText:17}
      ]
    },
    {
      id: 17,
      precedentText : 13,
      text:"You were just a child. Your were used to your parents fighting but not like that, not that way. The screaming was louder than usual. You were in the basement, your safe place from all this mess. That's always were you would go and hide. Your parents were both shouting, especially your mother. You would have love to help, but she had especially forbid you to intervene.",
      options : [
        {text: "Continue to remember", nextText:18}
      ]
    },
    {
      id : 18,
      precedentText : 17,
      text : "You were playing with your rubick's cube, trying to keep your mind occupied. You were almost done with the third sides. That's when you heard it. The loud sound. You mother went silent. You father on the other hand was still screaming. You remember feeling frozen in the basement as your father walked towards the door of the stairs. You heard the door open and the loud thump of his shoes on the steps. And then you felt it, his icy cold fingers squeezing your arms.",
      options : [
        {text:"Continue", nextText:19}
      ]
    },
    {
      id : 19,
      precedentText : 18,
      text : "You come back to reality, the cold, the dark, the basement and then, you feel it, around your arm. Icy. Cold. Fingers. Squeezing you.",
      options : [
        {text : "Continue", nextText:20}
      ]
    },
    {
      id : 20, 
      precedentText : 19,
      text : "THE END"
    }
    ];

startGame();

// fonction qui permet d'afficher une lettre après l'autre à l'aide d'un set intervall (l'intervall se clear 
// à chaque fois que l'on appuie sur un bouton)
function typeEffect(element, speed) {
	var text = element.innerHTML;
	element.innerHTML = "";
	var i = 0;
	var timer = setInterval(function() {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
  return timer;
}

