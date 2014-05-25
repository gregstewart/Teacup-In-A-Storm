class ParserFactory

  def build (type)

    case type
      when :foursquare
        parser = FoursquareParser.new
      when :instagram
        parser = InstagramParser.new
      when :delicious
        parser = DeliciousParser.new
      when :github
        parser = GithubParser.new
      when :twitter
        parser = TwitterParser.new
      when :vimeo
        parser = VimeoParser.new
      when :wordpress
        parser = WordpressParser.new
      else
        raise 'Unknown parser requested'
    end

    parser
  end

end