(function () {
    'use strict';

    var app = angular.module('app', [
        // Angular modules
        'ngAnimate',
        'ngRoute'

        // Custom modules

        // 3rd Party Modules
        
    ]);


    app.controller('RegisterController', ['$http', '$window', function ($http, $window) {
        var vm = this;

        vm.formData = {};

        vm.modules = [{ name: 'Car / Ride Sharing' },
                { name: 'Energy Sharing' },
                { name: 'Participatory Democracy' },
                { name: 'Connecting with Neighbours' },
                { name: 'Stuff Sharing / Swapping' },
                { name: 'Finance / Lending' },
                { name: 'Reputation and Trust' }];

        vm.toggleSelected = function (item) {
            item.selected = !(item.selected);
        };

        vm.sendEmail = function () {
            if (vm.formData.name == null || vm.formData.name == "" || vm.formData.email == null || vm.formData.email == "") {
                $window.scrollTo(0, 0);
                return;
            }
            vm.formData.interests = [];
            for (var i = 0; i < vm.modules.length; i++) {
                if (vm.modules[i].selected) vm.formData.interests.push(vm.modules[i].name);
            }
            $http.post('/api/Email/', vm.formData).
                    then(function (response) {
                        vm.success = true;
                        $window.scrollTo(0, 0);
                    }, function (response) {
                        vm.error = true;
                    });
        };

        vm.lastAmountSelected = -1;
        vm.clearpledge = function (amt) {
            if (amt == vm.lastAmountSelected) {
                vm.lastAmountSelected = null;
                vm.formData.pledgeAmount = null;
            } else {
                vm.lastAmountSelected = amt;
            }
        };

    }]);


    app.controller('LearnController', [function () {
        var vm = this;
        //{author: "xxxx", link: "xxxx", title: "xxxx"}
        vm.whatis = [
            {author: "A Shareable Explainer", link: "http://www.shareable.net/blog/a-shareable-explainer-what-is-a-platform-co-op", title: "What is a platform co-op"},
            {author: "Trebor Shultz", link: "https://medium.com/@trebors/platform-cooperativism-vs-the-sharing-economy-2ea737f1b5ad#.wbl4krcpq", title: "Platform Cooperativism vs The Sharing Economy"},
            {author: "Nathan Schneider", link: "http://www.shareable.net/blog/owning-is-the-new-sharing", title: "Owning is the new sharing"},
            {author: "Janele Orsi", link: "http://bccm.coop/the-bccm-at-the-sydney-vivid-festival/#.WA2E36Or1E4", title: "BCCM at the Sydney Vivid Festival"},
            {author: "Platform Cooperative", link: "http://platformcoop.net", title: "Platform Cooperativism 2016 Conference"}
        ];

        vm.economy = [
            {author: "Rachel Bostman", link: "https://www.ted.com/talks/rachel_botsman_the_case_for_collaborative_consumption", title: "The case for collaborative consumption"},
            {author: "Rachel Botsman", link: "https://www.ted.com/talks/rachel_botsman_the_currency_of_the_new_economy_is_trust?language=en", title: "On trust as the currency of the new economy"},
            {author: "Robin Chase on Peers Inc", link: "http://www.businessinnovationfactory.com/summit/video/robin-chase-reinventing-capitalism#.WA2FpKOr1E4", title: "Reinventing Capitalism"},
            {author: "Jeremiah Owyang", link: "http://www.web-strategist.com/blog/2016/03/10/honeycomb-3-0-the-collaborative-economy-market-expansion-sxsw", title: "The collaborative economy market expansion"},
            {author: "Ben Tarnoff", link: "http://www.theguardian.com/technology/2016/oct/17/sharing-economy-capitalism-uber-airbnb-ownership", title: "The future: where borrowing is the norm and ownership is luxury"}
        ];

        vm.talks = [
            {author: "Douglas Rushkoff", link: "http://www.rushkoff.com/books/throwing-rocks-at-the-google-bus", title: "Throwing Rocks at the Google Bus (book)"},
            {author: "Douglas Rushkoff", link: "https://www.youtube.com/watch?v=MFTGyvAwg5U", title: "How Growth Became the Enemy of Prosperity"},
            {author: "Jose Ramos", link: "http://www.earthsharing.org.au/2016/02/the-city-as-a-commons", title: "The City as Commons"},
            {author: "Jose Ramos", link: "https://blog.p2pfoundation.net/city-commons-policy-reader/2016/07/22", title: "The City as Commons: A Policy Reader"}
        ];

    }]);

})();
