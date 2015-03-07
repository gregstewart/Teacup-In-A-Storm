require 'spec_helper'

describe PagesController do
  DELICIOUS_COUNT = 5
  BLOG_COUNT = 10
  INSTAGRAM__COUNT = 6

  render_views

  describe "GET 'home'" do
    it "should be successful" do
      get 'home'
      response.should be_success
    end

    describe "check content" do
      before(:each) do
        visit root_path
      end

      describe "locales" do
        it "should have english content as the default" do
          delicious = page.all('h3.delicious')
          delicious[0].text.should =~ /#{DELICIOUS_COUNT} most recent bookmarks/

          wordpress = page.all('h3.wordpress')
          wordpress[0].text.should =~ /#{BLOG_COUNT} most recent posts/

          twitter = page.all('h3.twitter')
          twitter[0].text.should == "Recent tweets"

          foursquare = page.all('h3.foursquare')
          foursquare[0].text.should == "Recent checkins"

          instagram = page.all('h3.instagram')
          instagram[0].text.should =~ /#{INSTAGRAM__COUNT} most recent images/
        end
      end

      it "should have the right title" do
        page.should have_selector("title", :content => "TCIAS | Home")
      end

      it "should have only the tcias breadcrumb" do
        page.should_not have_selector("li.breadcrumb", :text => "portfolio")
        page.should_not have_selector("li.breadcrumb", :text => "cv")
      end

      it "should have google analytics" do
        page.should have_selector("script", :content => "_gaq")
      end

      it "should have 5 delicious links" do
        matching = page.all('li.delicious')
        matching.should have_at_least(1).items
        matching.should have_at_most(DELICIOUS_COUNT).items
      end

      it "should have 10 blog post links" do
        matching = page.all('li.wordpress')
        matching.should have_at_least(1).items
        matching.should have_at_least(BLOG_COUNT).items
      end

      it "should have 2 vimeo links" do
        matching = page.all('li.vimeo')
        matching.should have_at_least(1).items
        matching.should have_at_least(2).items
      end

      it "should have 5 twitter links" do
        matching = page.all('li.twitter')
        matching.should have_at_least(1).items
        matching.should have_at_least(5).items
      end

      it "should have 6 instagram links" do
        matching = page.all('li.instagram')
        matching.should have_at_least(1).items
        matching.should have_at_least(INSTAGRAM__COUNT).items
      end

      it "should have 5 github links" do
        matching = page.all('li.github')
        matching.should have_at_least(1).items
        matching.should have_at_least(5).items
      end

      it "should have 10 foursquare links" do
        matching = page.all('li.foursquare')
        matching.should have_at_least(1).items
        matching.should have_at_least(10).items
      end
    end

  end

  describe "GET 'portfolio'" do
    it "should be successful" do
      get 'portfolio'
      response.should be_success
    end

    it "should have the right title" do
      visit portfolio_path
      page.should have_selector("title", :content => "TCIAS | Portfolio")
    end

    it "should have the right breadcrumb" do
      visit portfolio_path

      page.should have_selector("li.breadcrumb", :text => "portfolio")
    end

  end

  describe "GET 'cv'" do
    it "should be successful" do
      get 'cv'
      response.should be_success
    end

    it "should have the right title" do
      visit cv_path

      page.should have_selector("title", :content => "TCIAS | Curriculum Vitae")
    end

    it "should have the right breadcrumb" do
      visit cv_path

      page.should have_selector("li.breadcrumb", :text => "cv")
    end
  end

  describe "GET 'timeline'" do
    it "should be successful" do
      get 'timeline'
      response.should be_success
    end
  end
end