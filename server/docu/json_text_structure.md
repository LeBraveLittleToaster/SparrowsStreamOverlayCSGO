# JSON Format

## Terms

    View 
        textfield shown in the layout
    
    Rating
        rating that indicates if it was a stomp, a win or a close win, including which teams won
        0 - friendly stomped        (csgo: 16-0 up to 16-6)
        1 - friendly won            (csgo: 16-7 up to 16-11)
        2 - friendly won (close)    (csgo: 16-12 up to 16-14, including overtime wins)
        3 - enemy won (close)       (csgo: 12-16 up to 14-16, including overtime wins)
        4 - enemy won               (csgo: 7-16 up to 11-16)
        5 - enemy stomped           (csgo: 0-16 up to 6-16)

    Game
        Which game is played, currently we decide between CSGO and LOL, other games will get an other static overlay
<br>

## Structure

### Counterstrike Sentences

- Rating number is equal to index in "rating" array
- devided in long and short sentences for bottom and top view
- available variables:
    - $friendly - friendly team name
    - $friendly_short - friendliy short teamname (max. 10 chars)
    - $enemy - enemy team name
    - $enemy_short - enemy short teamname (max. 10 chars)
    - $score_friendly - number of rounds friendly from last map
    - $score_enemy - number of rounds enemy from last map
    - $score_maps_friendly - amount of won rounds from friendly in the series
    - $score_maps_enemy - amount of won rounds from enemy in the series
    - $map_next_count - upcoming map number
    - $map_next_name - upcoming map name 
    - $map_chained_names - string with maps in the order they are played formattet: "map 1, map2, ... mapN-1 und mapN"
    - [best of only] $best_of - best of number (Best of 5 -> $best_of = 5)
    - [fixed count only] $map_fixed_count - how many maps are played
<br>
<br>

#### Top-Structure
    {
        "best_of_only" : [
            "long" : [see Pre-In-Post](#pre_in_post)
            "short" : [see Pre-In-Post](#pre-in-post)
        ],
        "fixed_count_only" : [
            "long" : [see Pre-In-Post](#Pre-In-Post)
            "short" : [see Pre-In-Post](#Pre-In-Post)
        ],
        "shared" : {
            "long" : [see Pre-In-Post](#Pre-In-Post)
            "short" : [see Pre-In-Post](#Pre-In-Post)
        }    
    }
<br>

#### Pre In Post

    {
        "pre" : [see Long-Short](#Long-Short),
        "in" : [see Long-Short](#Long-Short),
        "post" : [see Long-Short](#Long-Short)        
    }
<br>

#### Long-Short

    {
        "long_sentence" : [

        ],
        "short_sentence" : [

        ]     
    }


#### Examples

    {
        "best_of_only" : {
            ...
        },
        "fixed_count_only" : {
            ...
        },
        "shared" : {
            "long" : {
                "pre" : [
                    "Upcoming match - $friendly face off against $enemy",
                    "...",
                    "..."
                ],
                "in" : [
                    "Map $map_next_count is coming up",
                    "Our next map is $map_next_name",
                    "..."
                ],
                "post" : [
                    "Game is over, the final score is $score_maps_friendly to $score_maps_enemy",
                    "..."
                ]
            },
            "short" : {
                ...
            }
        }
    }