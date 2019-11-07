# DB設計

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :posts
- has_many :groups_users
- has_many  :groups,  through:  :groups_users

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false, unique: true|

### Association
- has_many :posts
- has_many :groups_users
- has_many  :users,  through:  :groups_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## postテーブル

|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user