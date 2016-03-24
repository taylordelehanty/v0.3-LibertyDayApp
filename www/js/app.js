// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers']) //

// .constant('ApiEndpoint', {
//   url: 'http://localhost:8100/packet/ldi_app'
// })

// .constant('ApiEndpoint', {
//   url: 'http://libertyday.org/packet/ldi_app'
// })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.decks', {
      url: '/decks',
      views: {
          'menuContent': {
              templateUrl: 'templates/decks.html',
              controller: 'DecksCtrl'
          }
      }
  })
  
  .state('app.flashcards', {
      url: '/decks/:deckTitle',
      views: {
          'menuContent': {
              templateUrl: 'templates/flashcards.html',
              controller: 'CardsCtrl'
          }
      }
  })
  
  .state('app.questions', {
      url: '/questions',
      views: {
          'menuContent': {
              templateUrl: 'templates/questions.html',
              controller: 'QuestCtrl'
          }
      }
  })
  
  .state('app.qAndA', {
      url: '/questions/:subject',
      views: {
          'menuContent': {
              templateUrl: 'templates/qAndA.html',
              controller: 'QAndACtrl'
          }
      }
  })
  
  .state('app.quiz', {
      url: '/quiz',
      views: {
          'menuContent': {
              templateUrl: 'templates/quiz.html',
              controller: 'QuizCtrl'
          }
      }
  })
  
  .state('app.about', {
      url: '/about',
      views: {
          'menuContent': {
              templateUrl: 'templates/about.html',
              controller: 'AboutCtrl'
          }
      }
  })
  
  ;
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/about');
})

.service('deckTitle', function() {
    return {
        title: "",
        getTitle: function() {
            return this.title;
        },
        updateTitle: function(title) {
            this.title = title;
        }
    }
})

.service('Shuffle', function() {
    return {
        shuffleArray: function(array) {
            var shuffledArray = array;
            for (var i = 0; i < array.length; i++) {
                var j = Math.floor(Math.random() * (i + 1))
                var itemSwitching = shuffledArray[i];
                shuffledArray[i] = shuffledArray[j];
                shuffledArray[j] = itemSwitching;
            }
            return shuffledArray;
        }
    }
})

// .service('ModalDispatch', function() {
//     return {
//         evaluateModal: function($scope, $ionicModal, modalIndex) {
//             switch (modalIndex) {
//                 case modalIndex == 0:
//                     $ionicModal.fromTemplateUrl('templates/login.html', {
//                         scope: $scope
//                     }).then(function(modal) {
//                         $scope.modal = modal;
//                     });
//                     break;
//                 case modalIndex == 1:
//                     $ionicModal.fromTemplateUrl('templates/results.html', {
//                         scope: $scope
//                     }).then(function(modal) {
//                         $scope.modal = modal;
//                     });
//                     break;
//             }
//         }
//     }
// })

// .service('ModalIndices', function() {
//     return {
//         index: 0,
//         getCurrentIndex: function() {
//             return this.index;
//         },
//         setIndex: function(newIndex) {
//             this.index = newIndex;
//         }
//     }
// })

.service('EvaluateQuiz', function(){
    return {
        results: [],
        getQuizResults: function() {
            return this.results;
        },
        updateQuizResults: function(results) {            
            this.results = results;
        }
    }
})

.factory('Subjects', function(Shuffle){
    var Subjects = [
        {title:"Constitution", cards: [ 
            {f:"Article I: Section I", b:"establishes Congress, consisting of Senate and House of Representatives"}, {f:"Article I: Section II", b:"defines House of Representatives"}, {f:"Article I: Section III", b:"defines Senate"} 
        ], easyQuestions:[], medQuestions:[], hardQuestions:[] },
        {title:"Bill of Rights", cards: [ 
            {f:"Amendment I", b:"Freedom of Religion, Press, Speech, Right to Peaceably Assemble, and to Petition"},  {f:"Amendment II", b:"Right to bear arms"},  {f:"Amendment III", b:"No quartering of soldiers"} 
        ], easyQuestions:[], medQuestions:[], hardQuestions:[] },
        {title:"Amendments 11-27", cards: [
             {f:"Amendment XI", b:"No hearing lawsuits against states"},  {f:"Amendment XII", b:"Election of President and Vice President"},  {f:"Amendment XIII", b:"Abolition of Slavery"}
        ], easyQuestions:[], medQuestions:[], hardQuestions:[] },
        {title:"Presidents", cards: [
             {f:"1st President (1789-1797)", b:"George Washington"},  {f:"2nd President (1797-1801)", b:"John Adams"},  {f:"3rd President (1809-1817)", b:"James Madison"}
        ], easyQuestions:[], medQuestions:[], hardQuestions:[] },
        {title:"Important Dates", cards: [
             {f:"May 25, 1787", b:"The Constitutional Convention opens with a quorum of seven states in Philadelphia to discuss revising the Articles of Confederation. Eventually all states but Rhode Island are represented."},  {f:"Sept. 17, 1787", b:"All 12 state delegations approve the Constitution, 39 delegates sign it of the 42 present, and the Convention formally adjorns."},  {f:"June 21, 1788", b:"The Constitution becomes effective for the ratifying states when New Hampshire is the ninth state to ratify it."}
        ], easyQuestions:[], medQuestions:[], hardQuestions:[] },
        {title:"Court Cases", cards: [
            {f:"Marbury v. Madison (1803)", b:"established judicial review"},  {f:"McCulloch v. Maryland (1819)", b:"Congress has implied powers that allow it to create a national bank, even though the Constitution does not explicitly state that power, and that Maryland’s taxing of its branches was unconstitutional."},  {f:"Gibbons v. Ogden (1824)", b:"The commerce clause of the Constitution grants the federal government the power to determine how interstate commerce is conducted."}
        ], easyQuestions:[], medQuestions:[], hardQuestions:[] },
        {title:"Vocabulary", cards: [
            {f:"Judicial Review", b:"A court with judicial review power may invalidate laws and decisions that are incompatible with a higher authority, such as the terms of a written constitution."},  {f:"Constitutional Convention", b:"Took place from May 25 to Sept. 17, 1787 in Philadelphia, Pennsylvania and the intention was to create a new government. The delegates elected George Washington to preside over the Convention. The result of the Convention was the creation of the United States Constitution"},  {f:"habeus corpus", b:"A person can report unlawful detention or imprisonment before a court."}
        ], easyQuestions:[], medQuestions:[], hardQuestions:[] },
        {title:"Supreme Court Justices", cards: [
            {f:"John Jay", b:"(1745-1829) Chief Justice in New York"},  {f:"John Rutledge", b:"(1789–1791) In South Carolina"},  {f:"William Cushing", b:"(1732–1810) In Massachussetts"}
        ], easyQuestions:[], medQuestions:[], hardQuestions:[] },
        {title:"Articles of Confederation", cards: [
            {f:"", b:""},  {f:"", b:""},  {f:"", b:""}
        ], easyQuestions:[], medQuestions:[], hardQuestions:[] }
    ];
    return {
        getTitles: function() {
            var titles = ["Shuffle All"]
            for (var i = 0; i < Subjects.length; i++) {
                titles.push(Subjects[i].title);
            }
            return titles;
        },
        getCards: function(subject) {
            if (subject == "Shuffle All") {
                var allCards = [];
                for (var i = 0; i < Subjects.length; i++) {
                    for (var j = 0; j < Subjects[i].cards.length; j++) {
                        allCards.push(Subjects[i].cards[j]);
                    }
                }
                return Shuffle.shuffleArray(allCards);
                // return allCards;
            } else {
                for (var i = 0; i < Subjects.length; i++) {
                    if (Subjects[i].title == subject) {
                        return Subjects[i].cards;
                    }
                }
            }
        },
        getEasyQs: function(subject) {
            return Subjects.easyQuestions;
        },
        getMedQs: function(subject) {
            return Subjects.medQuestions;
        },
        getHardQs: function(subject) {
            return Subjects.hardQuestions;
        }
    }
})
    
;
