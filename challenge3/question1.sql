SELECT
    u.name AS 'User name',
    SUM(t.amount) AS 'Revenue',
    SUM(t.distance) AS 'Distance travelled',
    COUNT(DISTINCT t.cabId) AS 'Number of cabs that generated revenue',
    COUNT(t.id) AS 'Total trips done',
    c.regNumber AS 'Most active cab'
FROM
    users u
    INNER JOIN cabs c ON c.userId = u.id
    INNER JOIN trips t ON t.cabId = c.id
    AND t.amount > 0
GROUP BY
    u.id 
    
 
    
    --     Explanation:

    -- SUM() function to calculate the total revenue and distance travelled by each user.
    -- COUNT() function to count the number of cabs that generated revenue and the total number of trips done by each user where revenue generated.
    -- DISTINCT keyword to ensure that each cab is counted only once. The DISTINCT keyword for avoiding duplicate.
    -- AND operator to filter out trips that did not generate any revenue. This is done by checking that the amount value is greater than 0.
    -- GROUP BY clause to group the results by specific user.