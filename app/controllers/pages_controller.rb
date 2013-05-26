class PagesController < ApplicationController

  caches_page :home

  def home
    @title = "home"

    @page = Page.new
    @page.fetch
    #
    #@entries[:delicious] = @page.get_by_type('delicious')
    #@entries[:blog] = @page.get_by_type('blog')
    #@entries[:vimeo] = @page.get_by_type('vimeo')
    #@entries[:twitter] = @page.get_by_type('twitter')
    #@entries[:instagram] = @page.get_by_type('instagram')
    #@entries[:github] = @page.get_by_type('github')

    respond_to do |format|
      format.html
    end

  end

  def portfolio
    @title = "portfolio"
    respond_to do |format|
      format.html
    end
  end

  def cv
    @title = "cv"
    respond_to do |format|
      format.html
    end
  end
end
