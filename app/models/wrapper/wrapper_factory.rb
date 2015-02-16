class WrapperFactory

  def build (type)
    klass_for(type).new
  end

  def klass_for(type)
    case type
      when :foursquare
        FoursquareParser
      when :instagram
        InstagramParser
      when :delicious
        DeliciousParser
      when :github
        GithubParser
      when :twitter
        TwitterParser
      when :vimeo
        VimeoParser
      when :wordpress
        WordpressParser
      else
        raise 'Unknown parser requested'
    end
  end

end