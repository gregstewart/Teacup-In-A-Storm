class GithubParser

  def initialize
    @client = Octokit::Client.new(:access_token => APP_CONFIG['github']['access_token'])
  end

  def get_last_user_events number_of_items
    max_number_of_items = number_of_items - 1
    github_feed = @client.user_events(APP_CONFIG['github']['client_id'])

    github_feed[0..max_number_of_items]
  end
end
