class Group < ApplicationRecord
  has_many :groups_users
  has_many :users, throush: :groups_users
end
