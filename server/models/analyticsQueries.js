const updateAnalyticsOnOpen = `UPDATE analytics SET 
track_open_count=$1, 
last_opened=$2, 
click_ip_address=$3, 
device_type=$4, 
country=$5, 
city=$6, 
timezone=$7, 
region=$8,
useragent=$9 
WHERE 
analytics_id=$10`

const checkOpenCounts = `SELECT track_open_count 
FROM analytics 
WHERE analytics_id=$1`

module.exports = {updateAnalyticsOnOpen, checkOpenCounts}