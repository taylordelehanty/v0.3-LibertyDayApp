angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, EvaluateQuiz) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

//   // Form data for the login modal
//   $scope.loginData = {};

//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });

//   ModalDispatch.evaluateModal($scope, $ionicModal, ModalIndices.getCurrentIndex());

//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };
  
//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     console.log('Doing login', $scope.loginData);

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };

  
})

.controller('DecksCtrl', function($scope, $http, $state, deckTitle, Subjects) {
    var LiveAPI = false;
    $scope.sendTitle = function(title) {
            deckTitle.updateTitle(title);
        }
    if (LiveAPI) {
        $http.get("http://libertyday.org/packet/ldi_app/titles")
            .success(function(data) {
                $scope.titles = data;
            })
            .error(function(data) {
                console.log(data);
                alert("An error occurred while loading the flashcards");
            })
    } else {
        $scope.titles = Subjects.getTitles();
    }
})

.controller('CardsCtrl', function($scope, $http, deckTitle, Subjects, Shuffle) {
    var LiveAPI = false;
    var shuffled = false;
    if (LiveAPI) {
        $http.get("http://libertyday.org/packet/ldi_app/deck/" + deckTitle.getTitle())
            .success(function(data) {
                $scope.title = data[0].title;
                $scope.flashcards = data[0].card;
            })
            .error(function(data) {
                alert("An error occurred while loading the flashcards", data);
            })
    } else {
        $scope.flashcards = Subjects.getCards(deckTitle.getTitle());
    }
    
    $scope.shuffled = function() {
        shuffled = !shuffled;
        console.log("Shuffling ", shuffled, $scope.flashcards);
        if (shuffled) {
            $scope.flashcards = Shuffle.shuffleArray($scope.flashcards);
        } else {
            console.log(Subjects.getCards(deckTitle.getTitle()));
            $scope.flashcards = Subjects.getCards(deckTitle.getTitle());
        }
    }
})

.controller('QuestCtrl', function($scope, Subjects) {
    $scope.subjects = Subjects.getTitles();
    
})

.controller('QAndACtrl', function($scope, Shuffle) {
    $scope.questions = [
        {id: "1", q:"What are the first three words of the U.S. Constitution?", a: "We the People", c: ["We the Government", "We the States", "We the Congress"]},
        {id: "2", q:"The first three articles of the U.S. Constitution describe the three branches of the U.S. government. What are they?", a: "Judicial, Legislative, Executive", c: ["Legislative, Executive, Artificial", "President, Congress, High Court", "Executive, Congress, Legislative"]},
        {id: "3", q:"The Congress of the United States is divided into two sections: What are they?", a: "Senate, House of Representatives", c: ["House of Commons, Parliament", "House of Commons, Senate", "Congress, Senate"]}
    ];
    
    for (var i = 0; i < $scope.questions.length; i++) {
        var question = $scope.questions[i];
        question.viewAnswers = [{a:question.a, right:true}];
        for (var j = 0; j < question.c.length; j++) {
            question.viewAnswers.push({a:question.c[j], right:false});
            
        }
        question.viewAnswers = Shuffle.shuffleArray(question.viewAnswers);
    }
    
    $scope.submitAnswers = function() {
        console.log("Answers submitted");
        console.log($scope.questions);
        for (var i = 0; i < $scope.questions.length; i++) {
            var question = $scope.questions[i];
            console.log(question.viewAnswers[question.currentChoice].right);
        }
    }
})

.controller('AboutCtrl', function($scope) {
    
})

.controller('ResultsCtrl', function($scope) {
    
})

.controller('QuizCtrl', function($scope, Shuffle, $ionicModal, EvaluateQuiz) {
    $scope.questions = [
        {id: "1", q:"What are the first three words of the U.S. Constitution?", a: "We the People", c: ["We the Government", "We the States", "We the Congress"]},
        {id: "2", q:"The first three articles of the U.S. Constitution describe the three branches of the U.S. government. What are they?", a: "Judicial, Legislative, Executive", c: ["Legislative, Executive, Artificial", "President, Congress, High Court", "Executive, Congress, Legislative"]},
        {id: "3", q:"The Congress of the United States is divided into two sections: What are they?", a: "Senate, House of Representatives", c: ["House of Commons, Parliament", "House of Commons, Senate", "Congress, Senate"]}
    ];
    
    
    for (var i = 0; i < $scope.questions.length; i++) {
        var question = $scope.questions[i];
        question.viewAnswers = [{a:question.a, right:true}];
        for (var j = 0; j < question.c.length; j++) {
            question.viewAnswers.push({a:question.c[j], right:false});
            
        }
        question.viewAnswers = Shuffle.shuffleArray(question.viewAnswers);
    }
    
    $scope.submitAnswers = function() {
        var correct = 0;
        console.log("Answers submitted");
        console.log($scope.questions);
        for (var i = 0; i < $scope.questions.length; i++) {
            var question = $scope.questions[i];
            console.log(question.viewAnswers[question.currentChoice].right);
            if (question.viewAnswers[question.currentChoice].right == true) {
                correct++;
            }
        }
        $scope.correct = correct;
    }
  
    //Creates the results modal we use after the questions webpage
    $ionicModal.fromTemplateUrl('templates/results.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    
    $scope.closeResults = function() {
        $scope.modal.hide();
    };
    
    $scope.getResults = function() {
        console.log("Results", EvaluateQuiz.getQuizResults());
        $scope.quizResults = EvaluateQuiz.getQuizResults();
        $scope.modal.show();
    };
})

;
