class GithubParser

  def initialize
    @client = Octokit::Client.new(:access_token => APP_CONFIG['github']['access_token'])
  end

  def get_last_user_events number_of_items
    max_number_of_items = number_of_items - 1
    github_feed = @client.user_events(APP_CONFIG['github']['client_id'])

    format github_feed[0..max_number_of_items]
  end

  def format github_feed
    # created_at (date), type + repo.name (content), repo.url (url)
    items = []
    github_feed.each do |item|
      commit_message = commit_message_builder(item)
      github_item = {date: item['created_at'], content: commit_message,
                     url: item['repo']['url'], thumbnail: '', location: nil}
      items.push(github_item)
    end

    items
  end

  def commit_message_builder(item)
    if item[:payload][:commits]
      commit_message = ' : ' + item[:payload][:commits][0][:message]
    else
      commit_message = ''
    end
    item['type'] + ' ' + item['repo']['name'] + ' ' + commit_message
  end
end
