class User < ActiveRecord::Base
  belongs_to :story
  belongs_to :state

  has_many :stories

  scope :inactive,  where(:story_id => nil)
end
