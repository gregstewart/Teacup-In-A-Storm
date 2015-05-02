class CoderwallParser
  require('date_wrapper')
  def initialize
    @client = CoderWally::Client.new(APP_CONFIG['coderwall']['username'])
    @type = :coderwall
  end

  def get_last_user_events(number_of_items)
    badges = @client.user.badges
    format badges[0..number_of_items-1]
  end

  def format(coderwall_badges)
    coderwall_badges.map do |item|
      content = item.name + ': ' + item.description
      PageItem.new(@type, DateWrapper.fix_date(item.created), content, '', item.badge, '')
    end
  end
end