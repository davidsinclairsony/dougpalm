# dougpalm
Personal website of Doug Palm that uses EC2 and 

## deployment
- Serverless deployment with `yarn deploy`
- Serverless invalidation of cache with `yarn invalidate`
- Serverless removal with `yarn destroy`

# setup instructions
1. Create EC2 instance from [WordPress powered by Bitnami](https://aws.amazon.com/marketplace/pp/B007IP8BKQ)
2. Configure `package.json`
3. Execute `yarn deployment`
4. Install WP Migrate DB and generate original and new SQL files for domain
5. Execute drop tables on EC2:
  `$ mysql -u bn_wordpress -p bitnami_wordpress < drop-tables.sql`
6. Insert new tables on EC2:
  `$ mysql -u bn_wordpress -p bitnami_wordpress < new.sql`
7. Edit `wp-config.php` with the correct domain:
  ```
  $_SERVER['HTTPS']='on';
  define('WP_SITEURL', 'https://dougpalm.com/');
  define('WP_HOME', 'https://dougpalm.com/');
  ```
8. Invalidate the cache with `yarn invalidate`
