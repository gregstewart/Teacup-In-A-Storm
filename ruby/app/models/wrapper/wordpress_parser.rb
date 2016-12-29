class WordpressParser < Feed
  def initialize
    @url = "http://gregs.tcias.co.uk/atom.xml"
    @type = :wordpress
  end
end