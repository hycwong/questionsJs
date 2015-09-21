'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    //    var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));
  // variables for injection
  var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;

  // Injecting variables
  // http://stackoverflow.com/questions/13664144/how-to-unit-test-angularjs-controller-with-location-service
  beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce,
    $window){
      // The injector unwraps the underscores (_) from around the parameter names when matching

      scope = $rootScope.$new();

      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
    }));

    describe('TodoCtrl Testing', function() {
      it('setFirstAndRestSentence', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var testInputs = [
          {str:"Hello? This is Sung", exp: "Hello?"},
          {str:"Hello.co? This is Sung", exp: "Hello.co?"},
          {str:"Hello.co This is Sung", exp: "Hello.co This is Sung"},
          {str:"Hello.co \nThis is Sung", exp: "Hello.co \n"},

          {str:"Hello?? This is Sung", exp: "Hello??"},
          {str:"Hello?? This is Sung. ", exp: "Hello??"}
        ];

        for (var i in testInputs) {
          var results = scope.getFirstAndRestSentence(testInputs[i].str);
          expect(results[0]).toEqual(testInputs[i].exp);
        }
      });

      it('RoomId', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("new");
      });

      it('toTop Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.toTop();
        expect(window.scrollX).toBe(0);
        expect(window.scrollY).toBe(0);
      });

      it('To test watchCollection', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.todos=[{
          wholeMsg: "HI",
          head: " ",
          headLastChar: " ",
          desc: " ",
          linkedDesc: " ",
          completed: false,
          timestamp: new Date().getTime(),
          tags: "...",
          echo: 1,
          order: 1
        }, {}, {
          wholeMsg: "HIHI",
          head: " ",
          headLastChar: " ",
          desc: " ",
          linkedDesc: " ",
          completed: true,
          timestamp: new Date().getTime(),
          tags: "...",
          echo: 2,
          order: 2
        }];
      scope.$digest();
      });

      it('To test addTodo', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.input={};
        scope.input.wholeMsg="HI";
        scope.addTodo();
        expect(scope.input.wholeMsg).toBe("");
        scope.input.wholeMsg=" ";
        scope.addTodo();
        expect(scope.input.wholeMsg).toBe("");
      });

      it('To test doneEditing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.input = {};
        scope.input.wholeMsg = "HI";
        scope.doneEditing(scope.input);
        scope.input = {};
        scope.input.wholeMsg = " ";
        scope.doneEditing(scope.input);
        expect(scope.editedTodo).toBe(null);
      });

      it('To test clearCompletedTodos', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.todos.forEach = function (funct) {
          var testTodo = {};
          testTodo.completed = true;
          funct(testTodo);
        }
        scope.clearCompletedTodos();
        scope.todos.forEach = function (funct) {
          var testTodo = {};
          testTodo.completed = false;
          funct(testTodo);
        }
        scope.clearCompletedTodos();
      });

      it('To test increaseMax', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.maxQuestion = 5;
        scope.totalCount = 1;
        scope.increaseMax();
        scope.maxQuestion = 1;
        scope.totalCount = 5;
        scope.increaseMax();
      });

    });
  });
