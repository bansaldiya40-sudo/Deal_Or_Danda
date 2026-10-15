import type { PitchQuestion, StartupData } from '../types/game.ts';

// 68 Authentic, dynamic Hinglish questions partitioned across the 4 Sharks (17 per investor)
// Covering all 11 business categories: problem, market_size, revenue, gross_margin, cac_ltv, valuation, branding, scalability, execution, funding_use, sustainability
export const ALL_PITCH_QUESTIONS: PitchQuestion[] = [
  {
    "id": "namita_problem_1",
    "category": "problem",
    "askerId": "namita",
    "questionText": "What exact pain point are you solving, and who is desperately looking for this?",
    "hinglishText": "Aapka product sunne mein interesting hai, par yeh customer ki aisi kaunsi acute pain point solve kar raha hai jiske bina unka kaam nahi chalega?",
    "contextHint": "Focus on acute customer need, not just a nice-to-have vitamin.",
    "answers": [
      {
        "id": "n_p1_a1",
        "text": "Our customers currently waste 45 minutes daily or overpay 3x. We validated this with 1,200 paying early adopters.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "traction",
          "claimText": "1,200 paying validated customers",
          "valueDescription": "high_validation"
        },
        "feedback": "Superb! Quantified pain point and real validated paying customers.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "1,200 paying customers ka validation! Mujhe clarity bahut pasand aayi."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Theek hai, hawa mein baatein nahi kar rahe. Data lekar aaye ho."
          },
          "aman": {
            "emotion": "listening",
            "quote": "Validation achha hai boss, ab dekhna hai brand kitna cool hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Solid start. I like that you tested customer willingness to pay."
          }
        },
        "followUp": {
          "challengerId": "vineeta",
          "challengeText": "Paying customers are great, but are they one-time trial buyers or do they come back repeatedly?",
          "hinglishText": "1,200 customers impressive hain, par kya yeh repeat customers hain ya sirf first-time trial discount lene aaye the?",
          "interruptionContext": "Win-ita steps in to probe customer retention cohort",
          "responses": [
            {
              "id": "n_p1_f1",
              "text": "Over 48% buy again within 30 days without any reminder or discount coupon.",
              "quality": "strong_defense",
              "points": 10,
              "reaction": {
                "emotion": "impressed",
                "quote": "Numbers support kar rahe hain. 48% organic repeat is world-class!"
              }
            },
            {
              "id": "n_p1_f2",
              "text": "Most are first-time buyers right now, but we are designing loyalty referral scratch cards.",
              "quality": "mediocre",
              "points": 2,
              "reaction": {
                "emotion": "confused",
                "quote": "Growth ka plan hai ya bas hope hai? Scratch card se brand nahi tikti."
              }
            },
            {
              "id": "n_p1_f3",
              "text": "Repeat rate calculate karne ki zaroorat nahi hai, product itna sexy hai ki sab wapas aayenge!",
              "quality": "flustered",
              "points": -8,
              "dandaTrigger": true,
              "dandaMessage": "Repeat rate calculate karne ki zaroorat nahi?! DANDA!",
              "reaction": {
                "emotion": "angry",
                "quote": "Arre founder, assumption pe business nahi banta!"
              }
            }
          ]
        }
      },
      {
        "id": "n_p1_a2",
        "text": "It is a lifestyle upgrade for urban folks who appreciate premium quality and better packaging.",
        "quality": "good",
        "points": 15,
        "dandaTrigger": false,
        "claim": {
          "metric": "traction",
          "claimText": "Premium lifestyle positioning",
          "valueDescription": "lifestyle"
        },
        "feedback": "Good positioning, though subjective on \"premium feel\".",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Lifestyle product hai, matlab branding pe bahut kharcha hoga."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Packaging bech rahe ho ya dhandha?"
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Product mast hai, par brand ka dhamaka kahan hai?"
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Lifestyle niche hai, par margin healthy hona chahiye."
          }
        }
      },
      {
        "id": "n_p1_a3",
        "text": "India is a huge market of 140 crore people! If even 0.01% buy our product, we will become a unicorn!",
        "quality": "mediocre",
        "points": 4,
        "dandaTrigger": false,
        "feedback": "Classic 1% market trap! Investors hate lazy top-down market sizing.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "0.01% calculation is not a business strategy, founder."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Bhai, numbers dikha. Sapne baad mein bechna!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai pehle 10,000 customers toh laake dikhao!"
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Customer acquisition bottom-up hoti hai, top-down fantasy nahi."
          }
        }
      },
      {
        "id": "n_p1_a4",
        "text": "Nobody is doing this because competitors were not smart enough. We will create the need with viral reels!",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Reels bana ke startup chalayenge! Shark ko chakkar aa gaya!",
        "feedback": "DISASTER! Belittling the market and assuming viral reels equate to a viable business model.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "Foundation hi zero hai! Yeh business nahi, reel fantasy hai."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Founder confidence full, preparation null! Seedha DANDA!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Arre influencer reel se dhandha nahi banta mere bhai!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Product market fit ke bina reels pe paisa jalana suicidal hai."
          }
        }
      }
    ]
  },
  {
    "id": "namita_governance_2",
    "category": "sustainability",
    "askerId": "namita",
    "questionText": "Do you have necessary lab certifications, regulatory compliance, and clinical safety approvals?",
    "hinglishText": "Aap jo claims kar rahe hain, kya unke piche FSSAI, clinical tests ya certified lab reports hain?",
    "contextHint": "Health, wellness, and consumable products must prove lab-tested safety.",
    "answers": [
      {
        "id": "n_g2_a1",
        "text": "Yes, NABL-accredited 3rd party lab tested with zero heavy metals and fully licensed compliance documentation.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "traction",
          "claimText": "NABL-accredited 3rd party lab verified",
          "valueDescription": "certified_safe"
        },
        "feedback": "Flawless compliance and safety proof.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "This level of clinical rigor is what builds a 100-year brand. Very proud."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Paperwork pakka hai, kal ko court case nahi hoga."
          },
          "aman": {
            "emotion": "listening",
            "quote": "Trust banta hai customer ka iss se, solid!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Compliance avoids catastrophic recalls. Well done."
          }
        }
      },
      {
        "id": "n_g2_a2",
        "text": "We applied for certification last month and expect government approval in 60 days.",
        "quality": "good",
        "points": 15,
        "dandaTrigger": false,
        "feedback": "Work in progress, acceptable for early stage.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Pending approval is a slight risk, but good that process is initiated."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Fast-track karao isko."
          },
          "aman": {
            "emotion": "listening",
            "quote": "Cool, jaldi approval le lo."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Ensure legal sign-offs before full commercial ad spend."
          }
        }
      },
      {
        "id": "namita_governance_2_ans_mediocre",
        "text": "We think green packaging is a good idea and plan to look into eco-friendly bags next year.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_g2_a3",
        "text": "Sir, our grandmother used this recipe for 40 years! Ghar ki recipe ko certification ki kya zaroorat?",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Grandmother recipe bolkar lab compliance bypass?! DANDA!",
        "feedback": "DANGEROUS! Regulatory authorities do not accept grandma folklore in lieu of lab testing.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "Main is deal mein OUT hoon! Clinical safety cannot be compromised."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Dadi ji ka aashirwad theek hai, par food inspector factory seal kar dega!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Dadi ji ko tank mein bhej do pitch karne!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Huge liability risk. Absolutely unacceptable."
          }
        }
      }
    ]
  },
  {
    "id": "namita_scale_3",
    "category": "scalability",
    "askerId": "namita",
    "questionText": "How exactly will you deploy this capital, and what is your 18-month milestone roadmap?",
    "hinglishText": "Agar hum aapko yeh paisa de dein, toh agle 18 mahino mein aap isko kahan kharch karenge aur company kahan pahuchegi?",
    "contextHint": "Break down capital allocation into product R&D, distribution expansion, and key hires.",
    "answers": [
      {
        "id": "n_s3_a1",
        "text": "45% to expand into 15 key Tier-1 cities with proven distribution partners, 30% for automated manufacturing, and 25% working capital buffer to reach ₹1.5 Cr monthly run rate.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "burn",
          "claimText": "Structured capital deployment with 25% buffer",
          "valueDescription": "disciplined_scaling"
        },
        "feedback": "Rock-solid operational roadmap with balanced capital allocation.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "Very clear allocation. Focus on distribution and working capital is spot on."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Realistic milestones without reckless ad spend."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Agar aise execute kiya toh company sach mein scale hogi."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Tier-1 cities distribution is the right battleground. Lets do it!"
          }
        }
      },
      {
        "id": "n_s3_a2",
        "text": "We will double our marketing budget on digital ads and hire 5 top software developers from Bangalore.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent, though pouring 70%+ of fresh funds into Meta/Google ads can be risky.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Hiring is expensive, watch your payroll burn."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Ad spend scales linearly; build organic channels too."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Aggressive marketing zaroori hai, brand ko push milega."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Bangalore developers ke salary bills dekh kar hosh ud jayenge."
          }
        }
      },
      {
        "id": "namita_scale_3_ans_mediocre",
        "text": "If orders spike, our family and friends will stay up all night packing boxes in our garage.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_s3_a3",
        "text": "First thing: a swanky modern office in Bandra, ergonomic gaming chairs, and a team offsite in Goa to brainstorm!",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Investor ke paise se Goa offsite aur gaming chairs?! DANDAAA!",
        "feedback": "ULTIMATE OFFENSE! Spending early investor money on luxury offices and Goa trips.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Humara paisa lekar Goa mein mauj karoge?! BAAHAR NIKLO YAHAN SE!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Goa offsite pe humein bhi invite karte bhai! Par dhandha zero!"
          },
          "vineeta": {
            "emotion": "angry",
            "quote": "Zero capital discipline. This is insulting to investors."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Completely unaligned values. Main is deal mein OUT hoon!"
          }
        }
      }
    ]
  },
  {
    "id": "namita_channel_conflict_4",
    "category": "execution",
    "askerId": "namita",
    "questionText": "How do you handle channel conflict between your D2C website discounts and your offline retail shopkeepers?",
    "hinglishText": "Agar website pe 20% discount doge toh offline medical store ya kirana shopkeeper aapka maal kyu rakhega?",
    "contextHint": "Price parity between online and offline channels is essential to keep distributors happy.",
    "answers": [
      {
        "id": "n_c4_a1",
        "text": "Strict price parity. We offer exclusive bundled gift packs online, while offline carries standalone impulse packs with 30% retailer margin.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Flawless channel strategy. Bundles online, individual SKUs offline.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "Very mature distribution governance. Shopkeepers will respect this."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Sahi pakda hai. Offline distributor ko dhandha do tabhi chalega."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Impulse packs offline counter pe bikte hain, smart move!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Drives margins in both channels without cannibalization."
          }
        }
      },
      {
        "id": "namita_channel_conflict_4_ans_good",
        "text": "Our core team handles daily operations smoothly, though we need to recruit a senior supply chain lead.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_channel_conflict_4_ans_mediocre",
        "text": "We manage all inventory, accounts, and courier tracking using one giant shared WhatsApp group.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_c4_a2",
        "text": "We give discounts online whenever we need fast cash, and tell offline shops to match the price from their margin.",
        "quality": "blunder",
        "points": -14,
        "dandaTrigger": true,
        "dandaMessage": "Shopkeeper ki margin se online discount match karwayenge?! DANDA!",
        "feedback": "Distributors will throw your product out on the street immediately.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "You will destroy your distributor goodwill in 48 hours. I am OUT."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Bhai retail dhandha aise nahi chalta! Kharcha tumhara aur nuksan unka?!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Shopkeeper tumhara dabba phek dega bahar!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Total collapse of channel economics."
          }
        }
      }
    ]
  },
  {
    "id": "namita_market_size_5",
    "category": "market_size",
    "askerId": "namita",
    "questionText": "Who exactly is your core buyer persona in India, and what is the realistic serviceable addressable market?",
    "hinglishText": "Aapka real customer kaun hai? 140 crore ka number mat do, yeh batao Bharat mein kitne families actually yeh afford kar sakti hain?",
    "contextHint": "Identify SEC A/B household counts and realistic purchasing power.",
    "answers": [
      {
        "id": "n_ms5_a1",
        "text": "Target is 18M urban households earning >₹12L/year across top 35 cities. That gives an immediate serviceable market of ₹3,400 Crore.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Precise demographic targeting and grounded SAM calculations.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "18 million urban households is realistic and addressable. Great homework."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "At least 140 crore bolke bakwaas nahi ki."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Top 35 cities mein spending power zabardast hai boss."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Very sharp segmentation."
          }
        }
      },
      {
        "id": "namita_market_size_5_ans_good",
        "text": "We estimate the Tier-1 urban middle-class market at roughly ₹1,500 Crore, focusing on metro clusters first.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_market_size_5_ans_mediocre",
        "text": "Everyone with a smartphone is a potential customer eventually, so the market must be huge.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_ms5_a2",
        "text": "Anyone between age 5 and 95 with a mouth and an internet connection is our customer!",
        "quality": "blunder",
        "points": -14,
        "dandaTrigger": true,
        "dandaMessage": "Age 5 se 95 tak sab customer hain?! DANDA!",
        "feedback": "If your product is for everyone, it is for no one.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "When you target everyone, you reach no one. I am OUT."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "5 saal ka bachha aur 95 saal ke dada ji dono khareedenge?! Hadh hai!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Dada ji ko reel dikha ke bechoge kya?!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Zero customer focus."
          }
        }
      }
    ]
  },
  {
    "id": "namita_sustainability_6",
    "category": "sustainability",
    "askerId": "namita",
    "questionText": "What is your environmental impact policy, plastic footprint, and manufacturing waste treatment?",
    "hinglishText": "Packaging mein kitna single-use plastic hai, aur factory se nikla waste properly treat hota hai ya local nadi mein baha rahe ho?",
    "contextHint": "Modern consumer brands need strict EPR (Extended Producer Responsibility) compliance.",
    "answers": [
      {
        "id": "n_s6_a1",
        "text": "100% EPR certified with post-consumer recycled HDPE containers, and our co-packer operates a certified zero liquid discharge plant.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Exemplary ESG standards and regulatory foresight.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "Zero liquid discharge and 100% EPR! This is responsible entrepreneurship."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Builds immense credibility with modern consumers."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Government inspection ki tension khatam."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Eco-friendly angle sells very well with Gen-Z."
          }
        }
      },
      {
        "id": "namita_sustainability_6_ans_good",
        "text": "We use recyclable packaging and follow standard state pollution board compliance guidelines.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_sustainability_6_ans_mediocre",
        "text": "We think green packaging is a good idea and plan to look into eco-friendly bags next year.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_s6_a2",
        "text": "Sir, environment ka socha toh margin mar jayega! Sabse sasta virgin plastic use karte hain.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Environment ki aisi ki taisi bol diya?! DANDA!",
        "feedback": "Disregarding environmental laws invites immediate regulatory shutdown.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "Appalling lack of social conscience. Absolute no from me."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Kal pollution control board aayega aur tala maar dega!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai PR disaster ho jayega!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Unacceptable compliance risk."
          }
        }
      }
    ]
  },
  {
    "id": "namita_funding_use_7",
    "category": "funding_use",
    "askerId": "namita",
    "questionText": "Why do you need venture equity for working capital instead of low-cost bank credit lines?",
    "hinglishText": "Agar inventory ke liye paisa chahiye toh equity kyu dilute kar rahe ho? Bank se working capital loan kyu nahi lete?",
    "contextHint": "Venture equity should fund growth and R&D, not routine inventory cycles.",
    "answers": [
      {
        "id": "n_fu7_a1",
        "text": "We already secured a ₹75L bank OD limit at 9.5% for routine stock. This equity round is strictly for proprietary clinical trials and automation tooling.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Brilliant capital structure! Using cheap debt for working capital and equity for capex.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "Optimal capital structure. You truly understand corporate finance."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Sahi dimaag lagaya hai. Equity sasti nahi hoti."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Protects founder cap table dilution."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Solid financial maturity."
          }
        }
      },
      {
        "id": "namita_funding_use_7_ans_good",
        "text": "60% deployed to build inventory and retail presence, with 40% reserved for targeted digital awareness.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_funding_use_7_ans_mediocre",
        "text": "We will spend it wherever the biggest emergency pops up first, mostly online ads and buffer.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_fu7_a2",
        "text": "Bankers asked for balance sheets and collateral, but investors don’t ask for collateral so equity feels like free money.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Equity ko free money bol diya! Cashneer ne danda utha liya!",
        "feedback": "Equity is the most expensive cost of capital in business.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Equity free money lagti hai tujhe?! Yeh danda free mein padega!"
          },
          "namita": {
            "emotion": "angry",
            "quote": "Insulting to equity investors. I am OUT."
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Free money ka mela laga hai yahan!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Dangerous founder mindset."
          }
        }
      }
    ]
  },
  {
    "id": "namita_problem_8",
    "category": "problem",
    "askerId": "namita",
    "questionText": "Is your product an indispensable painkiller or just a good-to-have vitamin that gets cut during inflation?",
    "hinglishText": "Yeh product rozmarra ki zaroorat hai ya bas ek shauq hai jo mehengai badhte hi customer khareedna band kar dega?",
    "contextHint": "Demonstrate essential daily utility and resistance to economic downturns.",
    "answers": [
      {
        "id": "n_p8_a1",
        "text": "Our product replaces a chronic prescription expense with a 40% cheaper preventative regimen; 82% of users state they cannot go without it.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Clear painkiller status backed by chronic usage and cost savings.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "Preventative chronic healthcare is a multi-billion dollar shift. Superb."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "High switching costs and sticky user behavior."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Log dawai ka kharcha kam karne ke liye hamesha paisa denge."
          },
          "aman": {
            "emotion": "listening",
            "quote": "Stickiness is high, good!"
          }
        }
      },
      {
        "id": "namita_problem_8_ans_good",
        "text": "We validated this with 250 paying urban customers, though we are still formalizing our feedback loops.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "n_p8_a2",
        "text": "It is a luxury impulse buy that customers splurge on when they feel guilty on Friday nights.",
        "quality": "mediocre",
        "points": 8,
        "dandaTrigger": false,
        "feedback": "Impulse guilt buys have volatile repeat cohorts.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Impulse guilt purchases make lifetime value forecasting unpredictable."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Friday night ko bikega, Monday ko bhool jayenge."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Guilt-tripping customers can work if the branding is cheeky!"
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Retention will be difficult."
          }
        }
      },
      {
        "id": "namita_problem_8_ans_blunder",
        "text": "Hum balance sheet aur logic mein vishwas nahi rakhte; humara belief system hai ki universe humein ameer banayega!",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Universe ameer banayega bolke business logic gayab?! DANDA!",
        "feedback": "Disastrous response showing utter lack of business sense or dangerous overconfidence.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Bhai tu dhandha band kar aur ghar baith! Yeh sab doglapan hai!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Arre bhai yeh sunke toh chakkar aa gaya!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Completely unviable proposition."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Appalling lack of business fundamentals. I am OUT."
          }
        }
      }
    ]
  },
  {
    "id": "namita_execution_9",
    "category": "execution",
    "askerId": "namita",
    "questionText": "How is equity split between founders, and do you have a 4-year vesting agreement with a 1-year cliff?",
    "hinglishText": "Founders ke beech equity kaise banti hui hai? Agar kal ko co-founder jhagda karke chhod jaye toh kya unka share lock ho jayega?",
    "contextHint": "Co-founder disputes without vesting schedules destroy early startups.",
    "answers": [
      {
        "id": "n_e9_a1",
        "text": "50-50 split with standard 4-year vesting and 1-year cliff, plus a formal shareholder deed restricting transfer rights.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "burn",
          "claimText": "4-year founder vesting and clean SHA",
          "valueDescription": "clean_governance"
        },
        "feedback": "Standard institutional governance protects everyone.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "Clean vesting and formal shareholder deed. Best practice in corporate governance."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Good. Co-founder bhag jaye toh equity zinda rehti hai."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Avoids messy dead-equity hostage situations."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Dosti apni jagah, paperwork apni jagah!"
          }
        }
      },
      {
        "id": "namita_execution_9_ans_good",
        "text": "Our core team handles daily operations smoothly, though we need to recruit a senior supply chain lead.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_execution_9_ans_mediocre",
        "text": "We manage all inventory, accounts, and courier tracking using one giant shared WhatsApp group.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_e9_a2",
        "text": "We gave 35% upfront to our college roommate who doesn’t code or work with us anymore, but he is our lucky charm.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Ex-roommate lucky charm ko 35% free equity de rakhi hai?! DANDA!",
        "feedback": "Dead cap table equity kills any chance of institutional funding.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "35% dead equity on cap table! Impossible to invest. I am OUT."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Lucky charm ko 35% de diya?! Hum aake uski lottery lagayein kya?!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Roommate ghar baith ke popcorn khayega aur hum paisa lagayein!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Un-investable cap table."
          }
        }
      }
    ]
  },
  {
    "id": "namita_cac_ltv_10",
    "category": "cac_ltv",
    "askerId": "namita",
    "questionText": "Are you leveraging professional doctor or expert endorsements, and what is your organic referral CAC?",
    "hinglishText": "Kya medical specialists ya industry experts aapko organically recommend kar rahe hain, ya sab kuch paid ads pe chal raha hai?",
    "contextHint": "Expert endorsements build trust and slash customer acquisition costs.",
    "answers": [
      {
        "id": "n_cac10_a1",
        "text": "Over 340 certified specialists recommend us organically after our blind trial study, driving 38% of our monthly new user signups at ₹0 CAC.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Professional word-of-mouth creates an unbeatable organic acquisition moat.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "340 certified specialists! This clinical trust is impossible to buy with ad money."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Zero CAC channel with 38% volume is extraordinary."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Free customer acquisition! Abhi profit banega."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Organic pull is the holy grail boss."
          }
        }
      },
      {
        "id": "namita_cac_ltv_10_ans_good",
        "text": "Our blended customer acquisition cost is around ₹480 with an LTV of ₹1,400 across 6-month cycles.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_cac_ltv_10_ans_mediocre",
        "text": "We spend whatever is left in our bank account on Meta ads and hope people click the link.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_cac10_a2",
        "text": "We pay doctors ₹500 cash per prescription under the table.",
        "quality": "blunder",
        "points": -18,
        "dandaTrigger": true,
        "dandaMessage": "Doctor ko under the table commission?! Police bulao! DANDA!",
        "feedback": "ILLEGAL AND CORRUPT! Violates medical council regulations.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "Illegal and unethical! I will never associate with this. OUT!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Yeh bribery khule aam bol raha hai national TV pe?! Pagal ho gaya hai kya?!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai raid pad jayegi company pe kal subah!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Severe criminal liability."
          }
        }
      }
    ]
  },
  {
    "id": "namita_gross_margin_11",
    "category": "gross_margin",
    "askerId": "namita",
    "questionText": "What is your margin structure across your distribution tiers: stockist, wholesaler, and retail chemist?",
    "hinglishText": "Super stockist kitna leta hai, distributor ko kitna milta hai, aur dukaandar ki jeb mein kitna margin jaata hai?",
    "contextHint": "Pharma and FMCG require 8-10% super-stockist, 12-15% distributor, and 20-25% retailer margins.",
    "answers": [
      {
        "id": "n_gm11_a1",
        "text": "Super stockist gets 8%, distributor gets 12%, and retailer gets 22%. Because our factory gross margin is 72%, our net company margin remains healthy at 30%.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "30% net margin after full offline distributor cascade",
          "valueDescription": "profitable_margins"
        },
        "feedback": "Flawless FMCG trade math with healthy net realization.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "You have mastered the traditional Indian trade distribution hierarchy."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Math bilkul clear hai. Trade margins accommodate karke bhi bachta hai."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Real understanding of channel margins."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Retailer khush toh dhandha mast!"
          }
        }
      },
      {
        "id": "namita_gross_margin_11_ans_good",
        "text": "We maintain a 52% gross margin, which gives reasonable buffer for standard distributor commissions.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_gross_margin_11_ans_mediocre",
        "text": "Margins are tight right now around 28%, but we hope suppliers will cut prices out of goodwill when we scale.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_gm11_a2",
        "text": "We give retailers only 3% margin and expect them to push our box out of sheer patriotism.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Dukaandar ko 3% deke desh-bhakti ki ummeed?! DANDA!",
        "feedback": "Retailers will not touch any brand with under 15% margins.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "Shopkeeper is in business to feed his family, not for patriotism. OUT."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "3% mein dukaandar apna light bill bhi nahi bharta!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Retailer tumhara box phek dega!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Completely out of touch with ground reality."
          }
        }
      }
    ]
  },
  {
    "id": "namita_branding_12",
    "category": "branding",
    "askerId": "namita",
    "questionText": "How are you building trust and credibility for high-involvement family products?",
    "hinglishText": "Mothers aur families ke health ke mamle mein trust sabse bada factor hota hai. Customer aap par vishwas kyu kare?",
    "contextHint": "Focus on clinical trials, transparent ingredient sourcing, and zero-defect guarantee.",
    "answers": [
      {
        "id": "n_b12_a1",
        "text": "Every batch QR code leads to the exact third-party lab test report showing 0.0% pesticides and heavy metals. Complete ingredient transparency.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Batch-level traceability is the gold standard for consumer trust.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "Batch level QR code transparency! That is how legendary consumer brands are born."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Raises the bar for the entire industry."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Customer ko dhokha nahi de rahe, solid."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Packaging pe QR code scan feature is super slick."
          }
        }
      },
      {
        "id": "namita_branding_12_ans_good",
        "text": "Clean, modern typography with clear ingredient callouts that appeal to younger urban consumers.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_branding_12_ans_mediocre",
        "text": "Our logo was designed by my cousin in college, and people say the colors look nice.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_b12_a2",
        "text": "We put a picture of a smiling mother and baby on the label and hired an astrologer to bless the batch.",
        "quality": "blunder",
        "points": -14,
        "dandaTrigger": true,
        "dandaMessage": "Batch testing ki jagah jyotish se aashirwad?! DANDA!",
        "feedback": "Superstition does not replace quality control.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "This is not science. I am completely OUT."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Astrologer se factory audit karwaya hai kya?!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Kundali match karke biscuit khao!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Ridiculous."
          }
        }
      }
    ]
  },
  {
    "id": "namita_revenue_13",
    "category": "revenue",
    "askerId": "namita",
    "questionText": "What is your revenue predictability: one-time transactions or recurring monthly subscriptions?",
    "hinglishText": "Revenue har mahine zero se shuru hoti hai ya customers auto-debit subscription pe hain?",
    "contextHint": "Recurring predictable subscription revenue commands 2x higher valuations.",
    "answers": [
      {
        "id": "n_r13_a1",
        "text": "41% of our monthly revenue comes from recurring auto-replenishment subscriptions with an average subscriber lifespan of 11 months.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "traction",
          "claimText": "41% recurring auto-replenishment subscriptions",
          "valueDescription": "high_recurring"
        },
        "feedback": "High predictability and 11-month average tenure are phenomenal.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "41% predictable ARR from subscriptions gives peace of mind."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "11 months cohort lifespan is top tier."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Cash flow forecastable hai, surprise nahi milega."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Customer hook pakka hai!"
          }
        }
      },
      {
        "id": "namita_revenue_13_ans_good",
        "text": "Consistent month-on-month sales with steady average order value, though growth slows slightly in off-season.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_revenue_13_ans_mediocre",
        "text": "Revenue goes up and down depending on how much we push our personal Instagram stories that week.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_r13_a2",
        "text": "We blast 10 spam SMS messages every morning to old customers begging them to buy.",
        "quality": "blunder",
        "points": -14,
        "dandaTrigger": true,
        "dandaMessage": "Subah subah 10 spam SMS bhejke bheekh maangte ho?! DANDA!",
        "feedback": "SMS spamming causes massive customer opt-outs and regulatory fines.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "Horrible brand destruction and invasive spamming. OUT."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Customer block karega aur police case karega!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Spam SMS se brand mar jaata hai bhai."
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Desperate and unsustainable."
          }
        }
      }
    ]
  },
  {
    "id": "namita_valuation_14",
    "category": "valuation",
    "askerId": "namita",
    "questionText": "How much total equity have you diluted so far, and how will you preserve founder incentive for future Series A and B rounds?",
    "hinglishText": "Founders ke paas abhi kitni equity bachi hai? Agar abhi zyaada dilute kar doge toh Series A mein aap minority ban jaoge!",
    "contextHint": "Founders should hold 65%+ going into Series A to remain motivated.",
    "answers": [
      {
        "id": "n_v14_a1",
        "text": "Founders still hold 88% of the company after angels. Offering 6% in this round keeps us at 82%, leaving ample ESOP pool and runway for Series A.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "valuation",
          "claimText": "Founders hold 88% clean cap table",
          "valueDescription": "grounded_valuation"
        },
        "feedback": "Ideal equity discipline keeps founders deeply motivated long-term.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "Very smart dilution trajectory. You will have full leverage in Series A."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Founders ke paas majority hai, bhagenge nahi."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Healthy ESOP pool capacity."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Clean and well-structured."
          }
        }
      },
      {
        "id": "namita_valuation_14_ans_good",
        "text": "Valuation is anchored to roughly 4x forward revenue based on current quarterly run rates.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_valuation_14_ans_mediocre",
        "text": "We calculated our valuation based on how much money we need to buy inventory for the next 2 years.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_v14_a2",
        "text": "We already gave away 65% of the company to an incubator for ₹10 Lakhs, so founders only hold 15% each.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Seed stage pe hi 65% incubator ko de diya?! Cap table barbaad! DANDA!",
        "feedback": "Founders with only 15% before Series A will walk away at the first hardship.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "Cap table is permanently ruined. No institutional investor will touch this. OUT."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Aap company mein founder nahi, incubator ke naukarn ho! Khatam!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Founders ka koi incentive hi nahi bacha boss."
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Completely uninvestable equity structure."
          }
        }
      }
    ]
  },
  {
    "id": "namita_scalability_15",
    "category": "scalability",
    "askerId": "namita",
    "questionText": "Can your supply chain maintain product freshness and active efficacy under 45°C Indian summer transport?",
    "hinglishText": "June ki garmi mein jab truck 45 degree temperature mein Rajasthan cross karega, kya aapka product kharab ho jayega ya melt ho jayega?",
    "contextHint": "Heat stability and temperature validation in Indian ambient distribution.",
    "answers": [
      {
        "id": "n_sc15_a1",
        "text": "We completed accelerated 6-month stability testing at 45°C and 75% relative humidity; zero degradation in potency or texture.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Real scientific stability testing avoids summer return catastrophes.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "Zone IV Indian climatic stability testing! Exactly what pharmaceutical rigor requires."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Prevents massive summer batch write-offs."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Dukan pe pighal ke keechad nahi banega."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Tested for real Bharat conditions."
          }
        }
      },
      {
        "id": "namita_scalability_15_ans_good",
        "text": "We have vetted secondary co-packers and established regional warehouse partnerships to handle 3x volume.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_scalability_15_ans_mediocre",
        "text": "If orders spike, our family and friends will stay up all night packing boxes in our garage.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_sc15_a2",
        "text": "We tell truck drivers to drive only at night and pray the sun doesn’t shine too bright.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Truck driver sirf raat ko chalaye aur suraj na nikle?! DANDA!",
        "feedback": "Hopeless lack of cold-chain and packaging engineering.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "Fantasy logistics. I am OUT."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Suraj ko bolenge dhandhe ke liye chhutti le le?! DANDA!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Truck mein ice cubes daal do bhai!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Total supply chain vulnerability."
          }
        }
      }
    ]
  },
  {
    "id": "namita_execution_16",
    "category": "execution",
    "askerId": "namita",
    "questionText": "What is your product return and customer complaint resolution policy?",
    "hinglishText": "Agar customer ko defective item mile toh kitne ghante mein resolution milta hai, aur replacement process kya hai?",
    "contextHint": "Fast no-questions-asked resolution builds cult customer loyalty.",
    "answers": [
      {
        "id": "n_ex16_a1",
        "text": "Instant WhatsApp resolution with automatic replacement dispatched within 2 hours. Our Net Promoter Score is 74.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Speed and trust drive high customer lifetime value.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "NPS of 74 and 2-hour dispatch! Outstanding customer care."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "WhatsApp customer support is what consumers love."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "High customer satisfaction protects word-of-mouth."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Achhi baat hai, par fraud returns par dhyan rakhna."
          }
        }
      },
      {
        "id": "namita_execution_16_ans_good",
        "text": "Our core team handles daily operations smoothly, though we need to recruit a senior supply chain lead.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_execution_16_ans_mediocre",
        "text": "We manage all inventory, accounts, and courier tracking using one giant shared WhatsApp group.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_ex16_a2",
        "text": "We make customers write a handwritten letter in English and post it to our registered office to discourage returns.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Defective product ke liye handwritten post letter maangte ho?! DANDA!",
        "feedback": "Hostile customer service creates viral backlash.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "Antiquated and disrespectful to consumers. OUT!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Post card likhwayenge 2026 mein?! DANDA!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Pigeon se reply bhejte ho kya bhai?!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Absolute reputational suicide."
          }
        }
      }
    ]
  },
  {
    "id": "namita_sustainability_17",
    "category": "sustainability",
    "askerId": "namita",
    "questionText": "Are all your factory partner workers paid fair living wages and working under certified safe conditions?",
    "hinglishText": "Aapke contract manufacturers kya legal minimum wage aur safety standards follow karte hain, ya exploitation chal raha hai?",
    "contextHint": "Social compliance audits prevent severe brand exposure and ethical blowbacks.",
    "answers": [
      {
        "id": "n_su17_a1",
        "text": "All facilities are SMETA and Sedex 4-Pillar ethical trade audited annually with certified living wages and zero child labor.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Comprehensive social compliance protects institutional brand standing.",
        "sharkReactions": {
          "namita": {
            "emotion": "impressed",
            "quote": "SMETA and Sedex certified. This is the gold benchmark for ethical supply chains."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Crucial for international expansion."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Legal headache nahi aayega kal ko."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Good clean ethics!"
          }
        }
      },
      {
        "id": "namita_sustainability_17_ans_good",
        "text": "We use recyclable packaging and follow standard state pollution board compliance guidelines.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "namita_sustainability_17_ans_mediocre",
        "text": "We think green packaging is a good idea and plan to look into eco-friendly bags next year.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "n_su17_a2",
        "text": "We don’t visit the factories; whoever bids the cheapest rate gets the contract, unka internal matter unhe dekhna hai.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Saste ke chakkar mein factory kabhi visit hi nahi ki?! DANDA!",
        "feedback": "Ignorance of supply chain labor conditions causes instant cancellation.",
        "sharkReactions": {
          "namita": {
            "emotion": "angry",
            "quote": "Wilful blindness to labor exploitation is unacceptable. OUT!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Kal ko labor inspector aake factory seal karega aur tum TV pe ro-oge!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai factory visit toh kar liya karo!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Catastrophic PR risk."
          }
        }
      }
    ]
  },
  {
    "id": "aman_diff_1",
    "category": "branding",
    "askerId": "aman",
    "questionText": "What stops a big player or me from copying your product tomorrow?",
    "hinglishText": "Hero, product theek hai, par agar hum ya koi badi brand kal yeh bana le, toh tumhara kya bachega? Differentiation kya hai?",
    "contextHint": "Explain your moat: proprietary recipe/tech, high switching cost, or cult community.",
    "answers": [
      {
        "id": "a_d1_a1",
        "text": "We have proprietary formulations with 2 patents pending, an exclusive supply chain tie-up, and 42% organic repeat purchases.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "Proprietary IP and 42% organic repeat",
          "valueDescription": "strong_moat"
        },
        "feedback": "Excellent defense! IP protection and customer retention prove real defensibility.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "42% organic repeat! Boss yeh sunkar maza aa gaya!"
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Chalo, copy-paste dhandha nahi hai. Moat create kiya hai."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "42% repeat cohort is exceptional for D2C. Commendable!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Patents and supply chain lock-in show mature thinking."
          }
        },
        "followUp": {
          "challengerId": "ashneer",
          "challengeText": "Patents take years. What if an FMCG giant copies the flavor profile under a different patent?",
          "hinglishText": "Patent toh theek hai, par agar koi bada player recipe thodi change karke market mein 50% discount pe utar de toh kya karoge?",
          "interruptionContext": "Cashneer Grover cuts in to test price war defense",
          "responses": [
            {
              "id": "a_d1_f1",
              "text": "Our deep supplier lock-in gives us 35% lower raw material costs that no newcomer can match.",
              "quality": "strong_defense",
              "points": 8,
              "reaction": {
                "emotion": "impressed",
                "quote": "Cost advantage hai toh player survive karega. Valid point."
              }
            },
            {
              "id": "a_d1_f2",
              "text": "We will file a court case and tweet against them on Twitter to build public sympathy.",
              "quality": "flustered",
              "points": -10,
              "dandaTrigger": true,
              "dandaMessage": "Business battle Twitter pe ladenge! Danda banta hai!",
              "reaction": {
                "emotion": "angry",
                "quote": "Bhai dhandha court mein nahi, market mein lada jata hai!"
              }
            }
          ]
        }
      },
      {
        "id": "a_d1_a2",
        "text": "Our brand tone is quirky, young, and we respond to every customer DM within 5 minutes.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Good customer centricity, though customer service alone is not an impenetrable moat.",
        "sharkReactions": {
          "aman": {
            "emotion": "listening",
            "quote": "Customer love achha hai, but isko scale par sustain karna padega."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "DM reply karne se valuation nahi banti bhai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Decent customer engagement, but barriers to entry are low."
          },
          "namita": {
            "emotion": "listening",
            "quote": "Good service culture, but business fundamentals need depth."
          }
        }
      },
      {
        "id": "aman_diff_1_ans_mediocre",
        "text": "Our logo was designed by my cousin in college, and people say the colors look nice.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_d1_a3",
        "text": "They can try to copy us, but my passion and energy cannot be copied! Hum din-raat khoon-paseena bahayenge!",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Moat ke naam pe Bollywood emotional dialogue! DANDA!",
        "feedback": "FATAL BLUNDER! Passion is necessary, but it is not a competitive barrier to entry.",
        "sharkReactions": {
          "aman": {
            "emotion": "laughing",
            "quote": "Passion toh theek hai bhai, par balance sheet pe passion nahi bikta!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Yeh kya motivational speaker ban rahe ho?! Dhandhe ka moat kahan hai?!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Passion without strategy is just an expensive hobby."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Business logic mangi thi, aapne filmi speech de di."
          }
        }
      }
    ]
  },
  {
    "id": "aman_brand_recall_2",
    "category": "branding",
    "askerId": "aman",
    "questionText": "When a user opens Instagram or walks into a supermarket, why will they pick YOUR box over established names?",
    "hinglishText": "Supermarket shelf pe 50 competing products hain. Customer ka hath tumhare packet pe hi kyu rukega? Brand ka dhamaka kahan hai?",
    "contextHint": "Packaging, distinctive visual asset, and instant emotional proposition.",
    "answers": [
      {
        "id": "a_b2_a1",
        "text": "Distinctive neon matte packaging with high contrast typography, 2x bigger flavor graphics, and a clear \"No Palm Oil\" claim on front.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Eye-catching shelf presence with clear health differentiator.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "Mast design hai boss! Shelf pe pop karega. Dil jeet liya!"
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Agar packaging bik rahi hai toh margin bhi accha hona chahiye."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Clear claims reduce customer decision fatigue."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Clean label front-of-pack claim is the future."
          }
        }
      },
      {
        "id": "aman_brand_recall_2_ans_good",
        "text": "Clean, modern typography with clear ingredient callouts that appeal to younger urban consumers.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_brand_recall_2_ans_mediocre",
        "text": "Our logo was designed by my cousin in college, and people say the colors look nice.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_b2_a2",
        "text": "We copied Apple’s minimalist white box with tiny silver text so it looks high-tech.",
        "quality": "blunder",
        "points": -12,
        "dandaTrigger": true,
        "dandaMessage": "FMCG biscuit packet ko Apple laptop ka box bana diya?! DANDA!",
        "feedback": "Minimalist tech packaging on consumer food items gets lost on retail shelves.",
        "sharkReactions": {
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai biscuit bech rahe ho ya iPhone?! Customer ko dabba dikhega bhi nahi!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Steve Jobs banne ki koshish band karo!"
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "No appetite appeal whatsoever."
          },
          "namita": {
            "emotion": "confused",
            "quote": "Completely misunderstood category cues."
          }
        }
      }
    ]
  },
  {
    "id": "aman_influencer_roi_3",
    "category": "cac_ltv",
    "askerId": "aman",
    "questionText": "What is your return on ad spend (ROAS) on influencer marketing vs performance ads?",
    "hinglishText": "Aap influencer marketing pe kharcha kar rahe ho ya sirf Meta performance ads pe? ROAS kitna nikal ke aa raha hai?",
    "contextHint": "Healthy D2C brands require ROAS > 3.0 on blended marketing.",
    "answers": [
      {
        "id": "a_i3_a1",
        "text": "Blended ROAS is 3.8x. Micro-influencers give 4.4x with affiliate commission codes, while Meta ads deliver 3.2x.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Superb unit marketing metrics. 3.8x blended ROAS is highly profitable.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "3.8x blended ROAS! Boss yeh sunke dil khush ho gaya!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Micro-influencer affiliate model keeps fixed burn in check."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Ad spend pe paisa kama rahe ho, aag nahi laga rahe."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Prudent marketing management."
          }
        }
      },
      {
        "id": "aman_influencer_roi_3_ans_good",
        "text": "Our blended customer acquisition cost is around ₹480 with an LTV of ₹1,400 across 6-month cycles.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_influencer_roi_3_ans_mediocre",
        "text": "We spend whatever is left in our bank account on Meta ads and hope people click the link.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_i3_a2",
        "text": "We don’t track ROAS. We gave ₹20 Lakhs to a Bollywood celebrity manager to post one story with our packet.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "ROAS ka pata nahi aur ₹20 Lakh single celebrity story pe udha diye?! DANDA!",
        "feedback": "Burning precious seed capital on ephemeral 24-hour stories without tracking.",
        "sharkReactions": {
          "aman": {
            "emotion": "laughing",
            "quote": "24 ghante mein story gayab aur ₹20 Lakh dhuen mein uda diya!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Bhai, numbers dikha. Sapne baad mein bechna! Yeh pure bewakoofi hai!"
          },
          "vineeta": {
            "emotion": "angry",
            "quote": "Completely unmeasurable burning of capital."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Zero marketing discipline. I am OUT."
          }
        }
      }
    ]
  },
  {
    "id": "aman_market_size_4",
    "category": "market_size",
    "askerId": "aman",
    "questionText": "How are you penetrating Bharat (Tier-2 and Tier-3 cities) beyond the South Delhi and South Bombay bubble?",
    "hinglishText": "Bandra aur Indiranagar ke aage Bharat shuru hota hai boss. Jaipur, Indore, Surat mein aapka maal kaise pahuchega?",
    "contextHint": "Vernacular content, local distribution, and accessible entry price points (₹99 - ₹199).",
    "answers": [
      {
        "id": "a_ms4_a1",
        "text": "We launched ₹99 trial sachets and vernacular regional creator campaigns in Hindi, Marathi, and Telugu; 54% of orders now come from Tier-2/3 cities.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Sensational Tier-2/3 playbook. Accessible price point and vernacular creators drive mass adoption.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "54% from Tier-2 and 3! Asli Bharat ko tap kar rahe ho boss, maza aa gaya!"
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Volume Bharat se hi aayega, Delhi-Mumbai mein saturation hai."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "₹99 trial pack is textbook consumer entry strategy."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Truly democratic consumer accessibility."
          }
        }
      },
      {
        "id": "aman_market_size_4_ans_good",
        "text": "We estimate the Tier-1 urban middle-class market at roughly ₹1,500 Crore, focusing on metro clusters first.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_market_size_4_ans_mediocre",
        "text": "Everyone with a smartphone is a potential customer eventually, so the market must be huge.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_ms4_a2",
        "text": "Tier-2 people don’t understand our aesthetic English branding, so we only sell to South Bombay folks.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Tier-2 Bharat ko uneducated bol diya?! DANDA padega!",
        "feedback": "Arrogant condescension toward India’s fastest-growing consumer markets.",
        "sharkReactions": {
          "aman": {
            "emotion": "angry",
            "quote": "Bharat ko underestimate mat karo! Asli dhandha wahin se banta hai!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Aukaat mein raho founder! Bharat tumhara dhandha bana bhi sakta hai aur mita bhi!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Elitist attitude that limits market ceiling to 0.1% of India."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Deeply offensive mindset. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "aman_product_5",
    "category": "problem",
    "askerId": "aman",
    "questionText": "Is this product something young customers will proudly flaunt in public, or hide in their pocket?",
    "hinglishText": "Product cool hona chahiye yaar! Kya college student isko table pe rakh ke flaunt karega ya bag ke kone mein chhupayega?",
    "contextHint": "Social currency and vanity drive word-of-mouth for consumer lifestyle goods.",
    "answers": [
      {
        "id": "a_p5_a1",
        "text": "Designed specifically with aesthetic pastel shades and matte metal finish; 31% of our buyers post unboxing stories without any incentive.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Organic social bragging generates free viral loops.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "Social currency! Table pe flaunt karenge toh dost poochhenge, aur brand ban jayegi!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Built-in visual virality lowers marketing costs."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek hai, bas customer ko dikhaane ke liye dhandha mat karo."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Young consumer psychology well understood."
          }
        }
      },
      {
        "id": "aman_product_5_ans_good",
        "text": "We validated this with 250 paying urban customers, though we are still formalizing our feedback loops.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_product_5_ans_mediocre",
        "text": "Customers seem to like it when we give them free samples outside metro stations, but tracking repeats is tough.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_p5_a2",
        "text": "It looks like a dull grey medical contraption from 1985, but we tell customers beauty is on the inside.",
        "quality": "blunder",
        "points": -12,
        "dandaTrigger": true,
        "dandaMessage": "Medical dabba bechke youth brand banenge?! DANDA!",
        "feedback": "Lifestyle products cannot afford to look like hospital equipment.",
        "sharkReactions": {
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai hospital ka ICU equipment lag raha hai! Kaun flaunt karega yeh?!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Ghar pe chhupayenge isko!"
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Aesthetic appeal is zero."
          },
          "namita": {
            "emotion": "listening",
            "quote": "Needs immediate industrial design overhaul."
          }
        }
      }
    ]
  },
  {
    "id": "aman_revenue_6",
    "category": "revenue",
    "askerId": "aman",
    "questionText": "What is your baseline revenue outside of Big Billion Day and Diwali sales spikes?",
    "hinglishText": "Diwali sale pe discount deke sabka number bada dikhta hai. Normal March ya July ke mahine mein actual dhandha kitna hota hai?",
    "contextHint": "Separate festive promotional spikes from organic month-on-month run rates.",
    "answers": [
      {
        "id": "a_r6_a1",
        "text": "Our off-season baseline is ₹65 Lakhs/month. Festive season spikes to ₹1.8 Crore, but our underlying non-discounted monthly sales grow 12% MoM.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "traction",
          "claimText": "₹65L off-season monthly baseline with 12% MoM organic growth",
          "valueDescription": "high_validation"
        },
        "feedback": "Honest, grounded revenue dissection shows true organic momentum.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "₹65 Lakh non-festive baseline! Bilkul sach bola boss, transparency pasand aayi."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Good. Sale ka tamasha nikal ke actual dhandha dikhaya."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Consistent non-promotional demand is the real test."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Disciplined forecasting."
          }
        }
      },
      {
        "id": "aman_revenue_6_ans_good",
        "text": "Consistent month-on-month sales with steady average order value, though growth slows slightly in off-season.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_revenue_6_ans_mediocre",
        "text": "Revenue goes up and down depending on how much we push our personal Instagram stories that week.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_r6_a2",
        "text": "We do 95% of our entire year’s sales during 4 days of Diwali flash sale at 70% off; rest of the year we chill.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Saal ke 4 din discount bechke baaki 361 din chill?! DANDA!",
        "feedback": "A business cannot survive on one week of deeply discounted seasonal flash sales.",
        "sharkReactions": {
          "aman": {
            "emotion": "laughing",
            "quote": "361 din chhutti manaoge aur Diwali pe discount bechoge?! Dhandha band kardo!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Yeh business nahi hai, yeh Diwali ka pataka stall hai!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Working capital nightmare."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Completely uninvestable revenue profile."
          }
        }
      }
    ]
  },
  {
    "id": "aman_execution_7",
    "category": "execution",
    "askerId": "aman",
    "questionText": "When a customer posts a savage 1-star viral video roasting your brand on Twitter/Instagram, what is your crisis protocol?",
    "hinglishText": "Agar kisi customer ne Instagram pe video bana ke tumhari brand ki dhajjiyan uda di, toh kaise handle karoge? PR crisis response kya hai?",
    "contextHint": "Humility, swift replacement, transparent communication, and rapid turnaround.",
    "answers": [
      {
        "id": "a_ex7_a1",
        "text": "Founder calls them personally within 30 minutes, full refund + free replacement sent immediately, and we publicly share the root cause fix on our story.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Turning an angry customer into a vocal brand advocate via radical transparency.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "Founder ka direct call! Yeh consumer love hi brand ko cult banata hai boss."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Fast turnaround defuses viral PR bombs."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Ego side mein rakh ke customer ko jeetna chahiye."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Accountability and leadership under fire."
          }
        }
      },
      {
        "id": "aman_execution_7_ans_good",
        "text": "Our core team handles daily operations smoothly, though we need to recruit a senior supply chain lead.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_execution_7_ans_mediocre",
        "text": "We manage all inventory, accounts, and courier tracking using one giant shared WhatsApp group.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_ex7_a2",
        "text": "We send our legal lawyer notice threatening criminal defamation and pay bot accounts to abuse the customer in comments.",
        "quality": "blunder",
        "points": -18,
        "dandaTrigger": true,
        "dandaMessage": "Customer ko legal notice aur bot troll army bhejoge?! DANDA!",
        "feedback": "Streisand effect guaranteed. Brand suicide in the social media era.",
        "sharkReactions": {
          "aman": {
            "emotion": "angry",
            "quote": "Customer ko threaten karoge?! Tumhara brand internet pe zinda jala diya jayega!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gunde ho kya founder?! Customer dhandha deta hai tujhe!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Reputational catastrophe."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Repulsive bully tactics. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "aman_scalability_8",
    "category": "scalability",
    "askerId": "aman",
    "questionText": "How is your quick-commerce playbook on Blinkit, Zepto, and Instamart? What is your stockout rate?",
    "hinglishText": "Aaj ka consumer 10 minute delivery chahta hai. Quick commerce pe dark-store fill rate kitna hai aur stockout kitna hota hai?",
    "contextHint": "Dark store proximity, inventory replenishment cycle, and fill rates >95%.",
    "answers": [
      {
        "id": "a_sc8_a1",
        "text": "We are active across 680 dark stores with a 98.2% fill rate. Quick commerce drives 44% of our total volume with 2-day automated re-ordering.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Superb quick commerce mastery. 98% fill rate is best-in-class.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "680 dark stores pe 98% fill rate! Quick commerce king ban rahe ho boss!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Rapid inventory velocity. Impressive execution."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "10 minute mein maal pahuchega toh impulse purchase barabar aayega."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Outstanding logistics integration."
          }
        }
      },
      {
        "id": "aman_scalability_8_ans_good",
        "text": "We have vetted secondary co-packers and established regional warehouse partnerships to handle 3x volume.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_scalability_8_ans_mediocre",
        "text": "If orders spike, our family and friends will stay up all night packing boxes in our garage.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_sc8_a2",
        "text": "We are constantly out of stock on Blinkit; when customers order, our co-founder takes an auto-rickshaw to deliver it himself.",
        "quality": "blunder",
        "points": -14,
        "dandaTrigger": true,
        "dandaMessage": "Co-founder auto-rickshaw mein 10 minute delivery kar raha hai?! DANDA!",
        "feedback": "Unscalable operational joke. High dark-store out-of-stock rates de-list your SKU.",
        "sharkReactions": {
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai auto mein ghoom ke delivery kar rahe ho?! Blinkit tumhara account suspend kar dega!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Auto ka kiraya zyada lag raha hoga delivery se!"
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Total collapse of supply chain planning."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Utterly unscalable."
          }
        }
      }
    ]
  },
  {
    "id": "aman_branding_9",
    "category": "branding",
    "askerId": "aman",
    "questionText": "Tell me about the unboxing experience. What happens in the first 10 seconds when a buyer cuts the tape?",
    "hinglishText": "Jab courier ka dabba khulta hai, customer ke chehre pe \"WOW\" aata hai ya lagta hai raddi khareed li?",
    "contextHint": "Sensory branding, personalized welcome cards, custom tissue wrap, and delightful aroma.",
    "answers": [
      {
        "id": "a_b9_a1",
        "text": "Custom embossed box, scented inner lining, a quirky personalized founder comic strip, and a peel-and-reveal sticker that 60% of people stick on their laptops.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Masterful sensory unboxing! Laptop stickers turn buyers into free walking billboards.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "Laptop sticker idea is pure genius boss! Free billboard marketing!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Great emotional bonding at minimal marginal packaging cost."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Kharcha kitna hai per box? 10-15 rupaye se zyada nahi hona chahiye."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Delightful customer delight engineering."
          }
        }
      },
      {
        "id": "aman_branding_9_ans_good",
        "text": "Clean, modern typography with clear ingredient callouts that appeal to younger urban consumers.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_branding_9_ans_mediocre",
        "text": "Our logo was designed by my cousin in college, and people say the colors look nice.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_b9_a2",
        "text": "We wrap it in old hindi newspapers stuffed with torn thermocol balls to save money.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Premium brand ko raddi akhbaar aur thermocol mein pack kiya?! DANDA!",
        "feedback": "Cheap packaging destroys perceived brand value instantly.",
        "sharkReactions": {
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai raddi akhbaar mein kaun pack karta hai premium product?! Dabba kholte hi mood off!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Kabadi-wala packaging band karo!"
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Destroys any chance of social unboxing."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Horrific consumer presentation."
          }
        }
      }
    ]
  },
  {
    "id": "aman_funding_use_10",
    "category": "funding_use",
    "askerId": "aman",
    "questionText": "How will you allocate marketing capital between high-glamour sponsorships and grassroots college ambassador programs?",
    "hinglishText": "Agar ₹1 Crore marketing budget mila, toh kya pura Bollywood ya cricket pe foonk doge ya ground level college festivals pe kharch karoge?",
    "contextHint": "Grassroots community advocacy builds deeper moat than vanity sponsorships.",
    "answers": [
      {
        "id": "a_fu10_a1",
        "text": "65% into our 250 campus ambassador network across 80 colleges driving ground trials, 25% for micro-creator seeding, and only 10% on regional event tie-ups.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Youth brand perfection! Campus ambassadors generate high-intent sticky conversions.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "250 campus ambassadors across 80 colleges! Asli youth connect yahan se banta hai boss!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Extremely efficient customer acquisition engine."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Celeb ko bina matlab crores nahi de rahe, good."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Grassroots community activation at its best."
          }
        }
      },
      {
        "id": "aman_funding_use_10_ans_good",
        "text": "60% deployed to build inventory and retail presence, with 40% reserved for targeted digital awareness.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_funding_use_10_ans_mediocre",
        "text": "We will spend it wherever the biggest emergency pops up first, mostly online ads and buffer.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_fu10_a2",
        "text": "We will spend 100% of the funds to get our logo printed on a cricket umpire’s hat for one T20 match.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Umpire ki hat pe logo lagane saara budget udha diya?! DANDA!",
        "feedback": "Vanity sports sponsorships burn capital without driving measurable conversion.",
        "sharkReactions": {
          "aman": {
            "emotion": "laughing",
            "quote": "Umpire ki topi pe logo?! Umpire out dega aur tumhara startup out ho jayega!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Bhai tu pagal hai kya?! Umpire ki topi dekh ke kaun khareedega?!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Catastrophic waste of working capital."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Zero marketing intelligence. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "aman_gross_margin_11",
    "category": "gross_margin",
    "askerId": "aman",
    "questionText": "When Amazon and Flipkart demand 35% commission plus mandatory sponsored ad clicks, how does your brand survive?",
    "hinglishText": "Marketplaces pe listing fees, commission, delivery charge aur ad spend milakar 40-50% cut ho jata hai. Bachta kya hai?",
    "contextHint": "Marketplace contribution margins and transitioning customers to direct D2C.",
    "answers": [
      {
        "id": "a_gm11_a1",
        "text": "Our marketplace SKU prices are calibrated for 65% gross margin. Even after 32% marketplace take-rate, we retain 33% contribution margin, and include a bounce-back coupon for our own D2C site.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "33% contribution margin on marketplaces with D2C funnel",
          "valueDescription": "profitable_margins"
        },
        "feedback": "Smart omnichannel strategy. Turning marketplace volume into proprietary direct traffic.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "Bounce-back coupon to D2C! Marketplaces se customer churana seekh gaye ho boss!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "33% net contribution on marketplaces is very resilient."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Amazon ke platform pe apna dhandha chala rahe ho, badiya."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Very astute margin planning."
          }
        }
      },
      {
        "id": "aman_gross_margin_11_ans_good",
        "text": "We maintain a 52% gross margin, which gives reasonable buffer for standard distributor commissions.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_gross_margin_11_ans_mediocre",
        "text": "Margins are tight right now around 28%, but we hope suppliers will cut prices out of goodwill when we scale.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_gm11_a2",
        "text": "We lose ₹120 on every Amazon order, but we consider Amazon as our philanthropic charity partner.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Amazon ko charity de rahe ho per order ₹120 loss karke?! DANDA!",
        "feedback": "Funding Jeff Bezos from your own pocket is not a viable D2C model.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Jeff Bezos ko charity de rahe ho?! Dhandha band karo aur sadak pe baitho!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Amazon ke liye tum charity chalate ho boss?! Wah!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Financial insanity."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Self-destructive business model. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "aman_cac_ltv_12",
    "category": "cac_ltv",
    "askerId": "aman",
    "questionText": "How are you leveraging WhatsApp broadcast communities and VIP customer clubs instead of paid ads?",
    "hinglishText": "Meta aur Google ad rates har saal 25% mehenge ho rahe hain. Proprietary community kahan hai jahan free mein orders aate hain?",
    "contextHint": "WhatsApp channels, VIP drops, and community loyalty engagement.",
    "answers": [
      {
        "id": "a_cac12_a1",
        "text": "We have 45,000 active members in our VIP WhatsApp Community. Exclusive limited-batch drops sell out in 4 hours with 0 ad spend, generating 28% of our monthly sales.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Exceptional D2C community playbook. Zero-CAC drops protect against ad inflation.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "45,000 VIP members on WhatsApp! Limited drops selling out in 4 hours! Boss, you nailed community!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Guards against rising Meta ad CPMs."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Meta ko commission nahi ja raha, yeh solid dhandha hai."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Deep consumer loyalty and direct relationship."
          }
        }
      },
      {
        "id": "aman_cac_ltv_12_ans_good",
        "text": "Our blended customer acquisition cost is around ₹480 with an LTV of ₹1,400 across 6-month cycles.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_cac_ltv_12_ans_mediocre",
        "text": "We spend whatever is left in our bank account on Meta ads and hope people click the link.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_cac12_a2",
        "text": "We just blast cold automated phone calls at dinner time with a robot voice shouting our discount.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Dinner time pe robocall chilla ke customer ko tang karte ho?! DANDA!",
        "feedback": "Robocalls lead to immediate consumer hatred and TRAI penalties.",
        "sharkReactions": {
          "aman": {
            "emotion": "angry",
            "quote": "Dinner time pe robocall?! Tumhari brand ko sab galiyan dete honge!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Mujhe aisi call aayi toh main cyber crime complaint kar dunga!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Toxic brand experience."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Unacceptable invasion of privacy. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "aman_valuation_13",
    "category": "valuation",
    "askerId": "aman",
    "questionText": "You are asking for a valuation like a high-margin tech software company. You are a consumer physical brand, hero! Justify this multiple!",
    "hinglishText": "Tech startup waali valuation maang rahe ho par bech rahe ho physical product! Physical brand ko tech multiple kyu dein?",
    "contextHint": "Show superior inventory turn, high gross margins, and proprietary brand pull over commodities.",
    "answers": [
      {
        "id": "a_v13_a1",
        "text": "Our 4x revenue multiple is fully aligned with top-quartile listed D2C brands. We have 64% gross margins, 18% EBITDA margin, and 3x faster inventory turns than legacy FMCG.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "claim": {
          "metric": "valuation",
          "claimText": "4x multiple supported by 18% EBITDA and 64% gross margin",
          "valueDescription": "grounded_valuation"
        },
        "feedback": "Grounded valuation based on EBITDA profitability, not tech hyperbole.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "18% EBITDA margin for a young brand! Maza aa gaya, multiple justified hai."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "4x revenue multiple with positive EBITDA is fair. Lootne nahi aaye ho."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Clean comparable benchmarking."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Reasonable and balanced ask."
          }
        }
      },
      {
        "id": "aman_valuation_13_ans_good",
        "text": "Valuation is anchored to roughly 4x forward revenue based on current quarterly run rates.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_valuation_13_ans_mediocre",
        "text": "We calculated our valuation based on how much money we need to buy inventory for the next 2 years.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_v13_a2",
        "text": "We integrated an AI ChatGPT bot on our website that tells dad jokes, so technically we are an AI DeepTech company worth 100x ARR!",
        "quality": "blunder",
        "points": -17,
        "dandaTrigger": true,
        "dandaMessage": "Chatbot laga ke physical product ko AI company ghoshit kar diya?! DANDA!",
        "feedback": "Slapping a generic AI chatbot does not make a commodity brand a deeptech unicorn.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Chatbot laga ke 100x maang rahe ho?! Doglapan ki parakashtha hai yeh!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai biscuit mein kaunsa AI model train ho raha hai?! Haha!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Laughable gimmick."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Insulting to our intelligence. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "aman_execution_14",
    "category": "execution",
    "askerId": "aman",
    "questionText": "When a new limited-edition drop goes viral and orders jump 10x overnight, how does your packaging and dispatch keep up?",
    "hinglishText": "Kal subah kisi bade creator ne story daal di aur achanak 10,000 orders aa gaye. Kya website crash hogi ya dispatch smoothly chalega?",
    "contextHint": "Cloud architecture resilience, automated 3PL warehouse fulfillment, and batch buffer stock.",
    "answers": [
      {
        "id": "a_ex14_a1",
        "text": "Headless Shopify architecture that easily scales to 50,000 concurrent sessions, coupled with 2 automated 3PL fulfillment hubs holding 14 days of pre-packaged buffer stock.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Modern tech and fulfillment infrastructure handles viral surges smoothly.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "Pre-packaged buffer stock! Viral hype aane pe delivery choke nahi hogi boss!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Dual 3PL hubs eliminate single point of failure."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "System prepared hai, dhandha miss nahi hoga."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Operational resilience."
          }
        }
      },
      {
        "id": "aman_execution_14_ans_good",
        "text": "Our core team handles daily operations smoothly, though we need to recruit a senior supply chain lead.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_execution_14_ans_mediocre",
        "text": "We manage all inventory, accounts, and courier tracking using one giant shared WhatsApp group.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_ex14_a2",
        "text": "Our server runs on a laptop in our living room; when 500 people open the site, the laptop starts smoking.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Living room ke laptop se e-commerce chala rahe ho?! DANDA!",
        "feedback": "Homebrew infrastructure fails under the slightest traffic surge.",
        "sharkReactions": {
          "aman": {
            "emotion": "laughing",
            "quote": "Laptop se dhuen nikal raha hai?! Bhai AWS ka naam suna hai kabhi?!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Customer order karega aur laptop blast ho jayega!"
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Amateurish infrastructure."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Totally unprepared for scale."
          }
        }
      }
    ]
  },
  {
    "id": "aman_branding_15",
    "category": "branding",
    "askerId": "aman",
    "questionText": "Why should young Indian consumers identify with YOUR brand story instead of cheap Chinese imports on Amazon?",
    "hinglishText": "Amazon pe bina naam ka sasta Chinese maal milta hai 40% saste mein. Customer unhe chhod kar aapki brand story se kyu connect karega?",
    "contextHint": "Quality assurance, local cultural pride, long warranty, and authentic founder connection.",
    "answers": [
      {
        "id": "a_b15_a1",
        "text": "Engineered specifically for Indian conditions with 2-year doorstep replacement guarantee and design aesthetic tailored for Indian youth pride; 89% say they chose us over imports for after-sales peace of mind.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Customer peace of mind and culturally rooted design destroy anonymous commodity imports.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "Doorstep replacement! Service hi consumer trust banti hai boss, dil jeet liya!"
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Customer ko pata hai kal ko kharab hua toh koi sunne wala hai."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Creates long-term defensible moat against grey market."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Pride in domestic engineering."
          }
        }
      },
      {
        "id": "aman_branding_15_ans_good",
        "text": "Clean, modern typography with clear ingredient callouts that appeal to younger urban consumers.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_branding_15_ans_mediocre",
        "text": "Our logo was designed by my cousin in college, and people say the colors look nice.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_b15_a2",
        "text": "We order the exact same Chinese items from AliExpress, put our sticker on top, and charge 3x price.",
        "quality": "blunder",
        "points": -18,
        "dandaTrigger": true,
        "dandaMessage": "AliExpress se maal mangakar sticker chipka ke 3x bech rahe ho?! DANDA!",
        "feedback": "White-label drop-shipping has zero moat and gets destroyed within 3 months.",
        "sharkReactions": {
          "aman": {
            "emotion": "angry",
            "quote": "Sticker brand! Isko brand nahi bolte mere bhai, yeh toh scam hai!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Yeh dhandha nahi hai, yeh middle-man dalali hai! BAAHAR JAAO!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Zero IP, zero differentiation."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Completely unethical shortcut. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "aman_product_16",
    "category": "problem",
    "askerId": "aman",
    "questionText": "Did you personally test this product with real users outside your immediate friends and family group?",
    "hinglishText": "Mummy-papa aur doston ko toh sabka product accha lagta hai. Kya 500 anjaan logon ko test karwaya bina bataye ki yeh aapka brand hai?",
    "contextHint": "Double-blind customer testing eliminates family bias and validates true product-market fit.",
    "answers": [
      {
        "id": "a_p16_a1",
        "text": "We conducted double-blind testing across 600 strangers in 4 college campuses; 78% preferred our product over market leaders without knowing the brand.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Rigorous blind testing proves genuine product superiority over legacy competitors.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "600 strangers ka double-blind test! Data bolta hai boss, respect!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Removes all confirmation bias."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Sach mein customer ne choose kiya hai, zabardast."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Methodical scientific validation."
          }
        }
      },
      {
        "id": "aman_product_16_ans_good",
        "text": "We validated this with 250 paying urban customers, though we are still formalizing our feedback loops.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_product_16_ans_mediocre",
        "text": "Customers seem to like it when we give them free samples outside metro stations, but tracking repeats is tough.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_p16_a2",
        "text": "Only tested on my co-founder and my grandmother, and both said I am the smartest boy in the world.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Dadi ji ne bola aap sabse smart boy ho?! DANDA padega beta!",
        "feedback": "Family compliments do not translate into commercial revenue.",
        "sharkReactions": {
          "aman": {
            "emotion": "laughing",
            "quote": "Dadi ji ka aashirwad zaroori hai, par customer dadi ji nahi hai bhai!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Ghar ke laadle, tank mein dhandha karne aaye ho ya dadi se taareef sunne?!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Zero objective market validation."
          },
          "namita": {
            "emotion": "confused",
            "quote": "Completely unverified product claims."
          }
        }
      }
    ]
  },
  {
    "id": "aman_sustainability_17",
    "category": "sustainability",
    "askerId": "aman",
    "questionText": "Can you introduce eco-friendly refill packs without making the brand look boring or compromise on shelf pop?",
    "hinglishText": "Plastic bottles ki jagah refill pouches la sakte ho jisme margin bhi bache aur brand ka swag bhi kam na ho?",
    "contextHint": "Smart refill economics boost margin while lowering environmental footprint.",
    "answers": [
      {
        "id": "a_su17_a1",
        "text": "Yes, our 250ml refill pouches cost 60% less to produce, boost gross margins by 8%, and reduced plastic usage by 78%. Customers love the bold typographic aluminum bottles they keep for years.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "Refill strategy boosts margins by 8% and cuts plastic 78%",
          "valueDescription": "profitable_margins"
        },
        "feedback": "Win-win! Higher margins, lower plastic footprint, and permanent shelf brand presence at home.",
        "sharkReactions": {
          "aman": {
            "emotion": "impressed",
            "quote": "Aluminum permanent bottle aur refill pouch! Swag bhi hai aur margin bhi! Super cool!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Refill models have 2x higher retention cohorts."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Margin badh raha hai aur plastic kam ho raha hai, both good."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "A shining model for circular economy."
          }
        }
      },
      {
        "id": "aman_sustainability_17_ans_good",
        "text": "We use recyclable packaging and follow standard state pollution board compliance guidelines.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "aman_sustainability_17_ans_mediocre",
        "text": "We think green packaging is a good idea and plan to look into eco-friendly bags next year.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_su17_a2",
        "text": "Refills are for boring hippie brands; we like throwing away thick gold-plated plastic jars after 1 use.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Thick gold-plated plastic jar fekna swag lagta hai?! DANDA!",
        "feedback": "Reckless wastefulness alienates environmentally conscious Gen-Z shoppers.",
        "sharkReactions": {
          "aman": {
            "emotion": "confused",
            "quote": "Gen-Z cancel kar dega tumhein agle 24 ghante mein!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Paisa barbaad aur environment barbaad!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Grossly irresponsible packaging philosophy."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Antithesis of modern brand ethics. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_unit_econ_1",
    "category": "gross_margin",
    "askerId": "vineeta",
    "questionText": "Walk me through your unit economics: Gross margin, CAC, and monthly burn?",
    "hinglishText": "Numbers pe aate hain. Aapka Gross Margin kitna hai, ek customer acquire karne mein kitna lagta hai (CAC), aur mahine ka burn kitna hai?",
    "contextHint": "Investors need to see that every unit sold makes healthy contribution margin.",
    "answers": [
      {
        "id": "v_u1_a1",
        "text": "Gross margin is 68%. Blended CAC is ₹320 with an LTV of ₹1,450 (4.5x LTV:CAC ratio). We burn ₹2.5L/month with 18 months runway.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "68% Gross Margin and ₹320 CAC",
          "valueDescription": "profitable_margins"
        },
        "feedback": "Phenomenal! Clear metrics, healthy 68% margin, and strong LTV:CAC ratio.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "68% gross margin aur 4.5x LTV to CAC! Ab aaya na maza!"
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Finally! Koi toh numbers ke saath homework karke aaya hai!"
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Runway bhi healthy hai, very neat math."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Such clarity on burn and unit level economics is rare."
          }
        },
        "followUp": {
          "challengerId": "namita",
          "challengeText": "Your CAC is ₹320 today. What happens when you scale beyond organic word of mouth?",
          "hinglishText": "Abhi ₹320 CAC is good, par jab ad scale karoge toh digital ad inflation se CAC double ho jayega. Tab unit economics survive karenge?",
          "interruptionContext": "Namita Tappar probes unit economics under aggressive scale",
          "responses": [
            {
              "id": "v_u1_f1",
              "text": "Even at 2x CAC (₹640), our 68% margin ensures positive unit contribution from the first order.",
              "quality": "strong_defense",
              "points": 10,
              "reaction": {
                "emotion": "impressed",
                "quote": "Very reassuring sensitivity analysis. Financial discipline clear hai."
              }
            },
            {
              "id": "v_u1_f2",
              "text": "We hope influencers will post about us for free because our founder is charismatic.",
              "quality": "flustered",
              "points": -10,
              "dandaTrigger": true,
              "dandaMessage": "Free influencer endorsement ki ummeed?! DANDA!",
              "reaction": {
                "emotion": "confused",
                "quote": "Mujhe business ka potential samajh nahi aa raha agar reliance free marketing pe hai."
              }
            }
          ]
        }
      },
      {
        "id": "v_u1_a2",
        "text": "Gross margin is around 45%. We spend mostly on Facebook ads with CAC around ₹600. We are currently break-even.",
        "quality": "good",
        "points": 15,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "45% Gross Margin and break-even",
          "valueDescription": "breakeven_margins"
        },
        "feedback": "Honest and realistic, though 45% margin leaves little buffer for rising ad costs.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "listening",
            "quote": "45% margin thoda tight hai for D2C ad inflation, but break-even is good."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Break-even par ho, matlab dhandha zinda hai."
          },
          "aman": {
            "emotion": "listening",
            "quote": "CAC ₹600 is okay, par creative branding se ise aur girana hoga."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Break-even status gives safety. I respect financial discipline."
          }
        }
      },
      {
        "id": "v_u1_a3",
        "text": "Currently we make -10% gross margin because we are heavily discounting to capture market share. Profit later!",
        "quality": "mediocre",
        "points": 4,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "Negative gross margin (-10%) due to discounts",
          "valueDescription": "negative_margins"
        },
        "feedback": "Selling ₹100 product for ₹90 hoping to make it up in volume is a dangerous gamble.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "confused",
            "quote": "Har product bechne pe jeb se paisa ja raha hai! Yeh cab company nahi hai."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Ghar se paise dekar customer la rahe ho?! Isko dhandha bolte hain?!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Discount band karoge toh customer bhag jayega boss!"
          },
          "namita": {
            "emotion": "confused",
            "quote": "Negative unit economics is completely unsustainable for this size."
          }
        }
      },
      {
        "id": "v_u1_a4",
        "text": "Honestly, right now we focus on pure user love! Financials toh excel sheet ka khel hai, accountant baad mein dekh lega!",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Accountant baad mein dekh lega?! Cashneer ka BP 200 pahunch gaya!",
        "feedback": "CATASTROPHIC! Never dismiss accounting and financial numbers in an investor pitch.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "Gross margin nahi pata aur funding lene aa gaye?! Unacceptable."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Bhai tu dhandha band kar aur ghar baith! Yeh sab doglapan hai!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Arre bhai, pitch stage pe aaye ho ya stand-up comedy show mein?!"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "No financial grip at all. Main is deal mein OUT hoon!"
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_rto_churn_2",
    "category": "execution",
    "askerId": "vineeta",
    "questionText": "What is your Cash on Delivery (COD) Return to Origin (RTO) percentage, and how does it hurt margins?",
    "hinglishText": "India mein COD orders pe 20-30% RTO rejection hota hai. Aapka RTO rate kitna hai aur reverse logistics cost kya hai?",
    "contextHint": "High RTO burns courier fees and ruins e-commerce margins.",
    "answers": [
      {
        "id": "v_r2_a1",
        "text": "We mandate a ₹50 pre-paid reservation fee for COD, keeping RTO under 9% with AI fraud detection.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "World-class e-commerce fraud control. 9% RTO is stellar.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "Under 9% RTO! You actually understand the Indian e-commerce battlefield."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Courier company ko faida nahi pahuncha rahe, apna paisa bacha rahe ho."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Pre-paid commitment works magic!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Outstanding cash control."
          }
        }
      },
      {
        "id": "vineeta_rto_churn_2_ans_good",
        "text": "Our core team handles daily operations smoothly, though we need to recruit a senior supply chain lead.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_rto_churn_2_ans_mediocre",
        "text": "We manage all inventory, accounts, and courier tracking using one giant shared WhatsApp group.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_r2_a2",
        "text": "Our RTO is 45%, but we consider the returned courier packages as free customer awareness in transit.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Returned delivery box ko free awareness bol diya?! DANDA!",
        "feedback": "Losing 45% of packages in two-way transit fees is business suicide.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "Courier company aapke expense pe rich ho rahi hai! This is fatal."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Bhai parcel dabba ghoomne se awareness nahi banti, nuksan hota hai!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Courier delivery boy tumhara sabse bada customer hai fir toh!"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Horrendous operational leak."
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_shelf_life_3",
    "category": "sustainability",
    "askerId": "vineeta",
    "questionText": "What is the product shelf life, and what is your current monthly inventory write-off percentage?",
    "hinglishText": "Product ki shelf-life kitni hai aur expiry ya damage ki wajah se monthly kitna maal scrap hota hai?",
    "contextHint": "Perishable goods require fast inventory turnover to avoid dead capital.",
    "answers": [
      {
        "id": "v_s3_a1",
        "text": "9 months ambient shelf life through nitrogen flushed barrier pouches. Monthly scrap rate is under 0.4%.",
        "quality": "great",
        "points": 23,
        "dandaTrigger": false,
        "feedback": "Excellent food science packaging. Zero waste.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "9 months ambient with <0.4% waste is very investable supply chain."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Dead stock nahi hai, cash flow safe hai."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Retail distribution ke liye 9 months minimum requirement hai, perfect."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Packaging technology is doing its job."
          }
        }
      },
      {
        "id": "vineeta_shelf_life_3_ans_good",
        "text": "We use recyclable packaging and follow standard state pollution board compliance guidelines.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_shelf_life_3_ans_mediocre",
        "text": "We think green packaging is a good idea and plan to look into eco-friendly bags next year.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_s3_a2",
        "text": "Shelf life is 10 days, so we throw away 40% of unsold stock every weekend into local bins.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Har hafte 40% maal kachre mein phenk rahe ho?! DANDA!",
        "feedback": "Massive unsold spoilage kills working capital.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "40% inventory scrap rate is impossible to fund. Unit economics doomed."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Kachre ke dibbe mein paise phenk rahe ho seedha!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai production planning kaun kar raha hai?"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Gross operational failure."
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_cac_ltv_4",
    "category": "cac_ltv",
    "askerId": "vineeta",
    "questionText": "Show me your cohort retention curves: what percentage of month-1 buyers purchase again in month 3 and month 6?",
    "hinglishText": "Cohort retention batao. Jo customer pehle mahine khareedta hai, teesre aur chhathe mahine mein unme se kitne log repeat karte hain?",
    "contextHint": "Healthy D2C consumer brands show flat cohort curves around 30-35% after month 3.",
    "answers": [
      {
        "id": "v_cl4_a1",
        "text": "Month-1 is 100%, Month-3 flattens at 38%, and Month-6 stabilizes at 32%. That gives us a 3.4x 12-month LTV over blended CAC.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "traction",
          "claimText": "32% stable 6-month repeat cohort",
          "valueDescription": "high_validation"
        },
        "feedback": "Textbook cohort stabilization! This proves real product-market fit.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "Flat cohort curve at 32% after month 6! This is pure D2C gold."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Customer loyal hai, naya customer laane ka kharcha kam hoga."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Repeat engine is humming boss!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Deep consumer stickiness."
          }
        }
      },
      {
        "id": "vineeta_cac_ltv_4_ans_good",
        "text": "Our blended customer acquisition cost is around ₹480 with an LTV of ₹1,400 across 6-month cycles.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_cac_ltv_4_ans_mediocre",
        "text": "We spend whatever is left in our bank account on Meta ads and hope people click the link.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_cl4_a2",
        "text": "By month 3, repeat is 1.5% because customers only bought because of a 90% off clearance glitch on Instagram.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "1.5% repeat rate?! Customer dobara dekhna bhi nahi chahta! DANDA!",
        "feedback": "Disastrous retention. Pouring ad money into a leaky bucket.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "Leaky bucket syndrome! You are burning marketing money into a bottomless pit."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Glitch se customer laoge toh dhandha glitch ban jayega!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Product mein dum nahi hai bhai."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Completely unviable business."
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_gross_margin_5",
    "category": "gross_margin",
    "askerId": "vineeta",
    "questionText": "Break down your Bill of Materials (BOM): formulation cost, inner packaging, outer carton, and contract manufacturer fee?",
    "hinglishText": "Agar product ₹500 ka bech rahe ho, toh uske andar ka liquid kitne ka hai, bottle kitne ki hai aur carton kitne ka hai? BOM breakdown do!",
    "contextHint": "Formulation should be 15-20% of MRP, packaging 8-10%, yielding 65%+ gross margin.",
    "answers": [
      {
        "id": "v_gm5_a1",
        "text": "On a ₹500 MRP, formulation is ₹62 (12.4%), custom bottle is ₹34 (6.8%), carton & label ₹18 (3.6%), and conversion fee is ₹22. Total COGS is ₹136, delivering a 72.8% gross margin.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "72.8% gross margin with ₹136 total COGS",
          "valueDescription": "profitable_margins"
        },
        "feedback": "Precision accounting mastery. 72.8% margin gives massive breathing room for channel expansion.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "72.8% gross margin with transparent component BOM! You know your factory floor inside out!"
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Superb math. ₹136 ki cost pe ₹500 realization, dhandha aise banta hai."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Margin buffer is super healthy!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Exemplary supply chain cost controls."
          }
        }
      },
      {
        "id": "vineeta_gross_margin_5_ans_good",
        "text": "We maintain a 52% gross margin, which gives reasonable buffer for standard distributor commissions.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_gross_margin_5_ans_mediocre",
        "text": "Margins are tight right now around 28%, but we hope suppliers will cut prices out of goodwill when we scale.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_gm5_a2",
        "text": "Total COGS is ₹480 on a ₹500 MRP, so we make ₹20 gross profit before paying rent and ads.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "₹500 ke item pe ₹480 cost?! ₹20 bacha ke unicorn banoge?! DANDA!",
        "feedback": "4% gross margin on consumer goods means instant bankruptcy after shipping fees.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "4% gross margin on consumer goods! One courier fee and you are deep in the red! OUT."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "₹20 bacha ke kya karoge?! Factory band karo!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "₹20 mein toh chai bhi nahi aati aaj kal!"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Fatal margin catastrophe."
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_revenue_6",
    "category": "revenue",
    "askerId": "vineeta",
    "questionText": "What is your channel mix today: own website vs marketplaces vs modern trade, and which is most profitable?",
    "hinglishText": "Aapki sales kahan se aati hai? Own D2C website, Amazon/Flipkart ya retail stores? Contribution margin kisme sabse zyada hai?",
    "contextHint": "Healthy mix: 40% D2C (high margin), 40% Marketplace (volume), 20% Retail.",
    "answers": [
      {
        "id": "v_r6_a1",
        "text": "45% Own D2C Website (36% net contribution), 40% Amazon/Flipkart (24% net contribution), and 15% Modern Trade pilot (20% net contribution). Blended contribution margin is 28.8%.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Balanced omnichannel distribution without over-reliance on any single platform.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "Balanced channel mix with 28.8% blended contribution. Truly sustainable."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Kisi ek platform ka ghulam nahi ho, very smart."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Own website pe 45% volume is outstanding."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Prudent channel diversification."
          }
        }
      },
      {
        "id": "vineeta_revenue_6_ans_good",
        "text": "Consistent month-on-month sales with steady average order value, though growth slows slightly in off-season.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_revenue_6_ans_mediocre",
        "text": "Revenue goes up and down depending on how much we push our personal Instagram stories that week.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_r6_a2",
        "text": "100% on a single third-party seller account on Flipkart, and if they block our account tomorrow, we go out of business.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Single Flipkart seller account pe pura dhandha dependent?! DANDA!",
        "feedback": "Existential platform risk. One algorithm tweak or seller strike ends the company.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "Single point of catastrophic failure. One algorithm tweak and you are dead."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Platform risk 100%! Humara paisa Flipkart ke mood pe chalega kya?!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Account suspend hua toh kahan jaoge?"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Totally unhedged business risk."
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_scalability_7",
    "category": "scalability",
    "askerId": "vineeta",
    "questionText": "How do you handle contract manufacturer Minimum Order Quantities (MOQ) without choking working capital?",
    "hinglishText": "Factory waale 20,000 units ka minimum order maangte hain. Agar naya flavor launch karna hai toh working capital lock nahi hota?",
    "contextHint": "Modular component sharing and split-batch manufacturing agreements.",
    "answers": [
      {
        "id": "v_sc7_a1",
        "text": "We standardized on a single universal glass bottle and cap across all 8 SKUs. Only the outer sleeve and label change, allowing us to hit 5,000 unit batch runs per flavor while unlocking 50k bulk bottle discounts.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "burn",
          "claimText": "Universal packaging inventory strategy cutting MOQ lockup",
          "valueDescription": "disciplined_scaling"
        },
        "feedback": "Genius supply chain modularity! Shared components eliminate dead stock and slash inventory holding costs.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "Standardized bottle across all SKUs! That is how you master manufacturing working capital!"
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Dimaag lagaya hai. Maal block nahi hoga godown mein."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Smart industrial design thinking."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Capital efficiency at its peak."
          }
        }
      },
      {
        "id": "vineeta_scalability_7_ans_good",
        "text": "We have vetted secondary co-packers and established regional warehouse partnerships to handle 3x volume.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_scalability_7_ans_mediocre",
        "text": "If orders spike, our family and friends will stay up all night packing boxes in our garage.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_sc7_a2",
        "text": "We ordered 100,000 units of 12 different weird flavors using our entire seed funding; all boxes are rotting in a leaky warehouse in Bhiwandi.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "12 flavors ke 1 lakh dibbe leke warehouse mein sada rahe ho?! DANDA!",
        "feedback": "Premature inventory scaling suffocates startups under unsold obsolete stock.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "Premature scaling textbook disaster. All working capital permanently locked in dead stock."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Bhiwandi ke godown mein chuhe tumhara seed money kha rahe hain!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Chuho ko flavor pasand aa raha hai lagta hai!"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Fatal working capital misallocation. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_market_size_8",
    "category": "market_size",
    "askerId": "vineeta",
    "questionText": "How does your price point sit against mass market incumbents vs luxury imports?",
    "hinglishText": "Aapka price mass market se 2x hai par luxury imported brands se 50% sasta hai. Kya consumer bridge brand ke liye ready hai?",
    "contextHint": "Masstige (prestige for the masses) positioning and value proposition.",
    "answers": [
      {
        "id": "v_ms8_a1",
        "text": "Masstige positioning: We offer active ingredients identical to ₹3,500 French imports at an accessible ₹799 price point, winning consumers trading up from ₹300 mass products.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Masstige sweet spot! Trading up mass consumers with premium efficacy at fair prices.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "The masstige sweet spot is where India’s consumer explosion is happening. Perfectly positioned."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Imports ko beat karoge aur mass se upar rahoge, solid."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Aspirational Bharat loves this price band."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Clear value bridge."
          }
        }
      },
      {
        "id": "vineeta_market_size_8_ans_good",
        "text": "We estimate the Tier-1 urban middle-class market at roughly ₹1,500 Crore, focusing on metro clusters first.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_market_size_8_ans_mediocre",
        "text": "Everyone with a smartphone is a potential customer eventually, so the market must be huge.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_ms8_a2",
        "text": "We priced it at ₹15,000 just because we wanted to be the most expensive brand in Asia.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Bina brand equity ke ₹15,000 price rakh diya?! DANDA!",
        "feedback": "Luxury pricing requires decades of cultural cachet, not founder hubris.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "Luxury pricing without heritage or brand pull is sheer hallucination."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "₹15,000 mein kyu lega koi anjaan brand?! Pagal samjha hai kya?!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai gold leaf daal rahe ho kya packet mein?!"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Complete pricing delusion. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_funding_use_9",
    "category": "funding_use",
    "askerId": "vineeta",
    "questionText": "What is your working capital cash conversion cycle: how many days between paying your supplier and collecting cash from retail?",
    "hinglishText": "Vendor ko 30 din mein advance dena padta hai aur dukaandar 90 din udhari pe maal leta hai. Yeh 60 din ka cash gap kaise bridge karoge?",
    "contextHint": "Negative vs positive cash conversion cycles and supplier credit terms.",
    "answers": [
      {
        "id": "v_fu9_a1",
        "text": "Because 85% of our revenue is digital (online prepay/COD settled in 3 days) while suppliers give us 45-day credit, we operate on a NEGATIVE 32-day working capital cycle. Growth generates cash.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "burn",
          "claimText": "Negative 32-day working capital cash conversion cycle",
          "valueDescription": "disciplined_scaling"
        },
        "feedback": "The ultimate CFO dream! Negative working capital means the business funds its own expansion without dilutive equity.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "Negative 32-day cash conversion cycle! That is a work of art in consumer finance!"
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Growth cash generate kar rahi hai, consume nahi kar rahi. Exceptional!"
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Cash flow king!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "World-class treasury discipline."
          }
        }
      },
      {
        "id": "vineeta_funding_use_9_ans_good",
        "text": "60% deployed to build inventory and retail presence, with 40% reserved for targeted digital awareness.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_funding_use_9_ans_mediocre",
        "text": "We will spend it wherever the biggest emergency pops up first, mostly online ads and buffer.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_fu9_a2",
        "text": "We give 180 days credit to everyone with zero security deposit, so we have ₹2 Crore stuck in the market that nobody wants to return.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Bina security ke 180 din udhari baant di?! DANDA padega!",
        "feedback": "Loose credit terms invite massive bad debts and immediate cash insolvency.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "180-day unsecured trade credit in India is basically gift money. You will never recover that cash."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Udhaar baant ke dhandha chala rahe ho?! Bazaar tumhara paisa hazam kar gaya!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Market se collection kaun karega bhai?"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Disastrous receivables management. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_execution_10",
    "category": "execution",
    "askerId": "vineeta",
    "questionText": "What is your warehouse dispatch error rate and shipping packaging defect frequency during festive peaks?",
    "hinglishText": "Diwali sale ke pressure mein kitne galat orders pack hote hain aur kitne glass containers raste mein break hote hain?",
    "contextHint": "Barcode scanning at packing, drop-tested packaging, and error rates <0.2%.",
    "answers": [
      {
        "id": "v_ex10_a1",
        "text": "Double barcode scan verification at packing stations keeps mis-picks under 0.12%. We use ISTA-3A certified honeycomb cushions, reducing transit breakages to 0.18%.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Precision fulfillment engineering protects customer goodwill and prevents expensive claim re-ships.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "ISTA-3A certified packaging with <0.2% transit damage! You build operations that scale cleanly."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Transit damage kam hai, courier refunds bachega."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "No broken bottles arriving at customer homes!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Quality control at every touchpoint."
          }
        }
      },
      {
        "id": "vineeta_execution_10_ans_good",
        "text": "Our core team handles daily operations smoothly, though we need to recruit a senior supply chain lead.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_execution_10_ans_mediocre",
        "text": "We manage all inventory, accounts, and courier tracking using one giant shared WhatsApp group.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_ex10_a2",
        "text": "30% of our glass bottles shatter in transit, so customers get a box soaked in leaking syrup and shards.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Customer ko glass ke tukde aur leaking syrup bhejte ho?! DANDA!",
        "feedback": "Dangerous and atrocious packaging quality guarantees 1-star reviews.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "Dangerous to customers! Glass shards inside delivery boxes is completely inexcusable."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Customer ka haath kat jayega box kholte hi! Police case hoga!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai bubble wrap ka naam nahi suna kya?!"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Severe product liability danger. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_valuation_11",
    "category": "valuation",
    "askerId": "vineeta",
    "questionText": "How do you justify your valuation relative to listed FMCG peers trading at 35x-45x P/E with proven 40-year track records?",
    "hinglishText": "Listed FMCG giants 40 saal se chal rahe hain aur unka multiple 35x P/E hai. Aap abhi shuru hue ho, yeh valuation kis basis pe justified hai?",
    "contextHint": "Growth rate premium (PEG ratio), digital scalability, and margin upside.",
    "answers": [
      {
        "id": "v_v11_a1",
        "text": "Legacy giants grow at 8-10% YoY, whereas we are growing at 140% YoY with 68% gross margins and zero legacy distribution bloat. Our PEG ratio is under 0.6 on forward earnings.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "valuation",
          "claimText": "140% YoY growth with 0.6 PEG ratio on forward earnings",
          "valueDescription": "grounded_valuation"
        },
        "feedback": "Financial sophistication at its best. Justifying high multiples via hyper-growth PEG parity.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "PEG ratio under 0.6! That is how a CFO articulates valuation premiums."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Good answer. Growth rate justify kar rahi hai multiple ko."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Clean financial storytelling."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Very convincing mathematical defense."
          }
        }
      },
      {
        "id": "vineeta_valuation_11_ans_good",
        "text": "Valuation is anchored to roughly 4x forward revenue based on current quarterly run rates.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_valuation_11_ans_mediocre",
        "text": "We calculated our valuation based on how much money we need to buy inventory for the next 2 years.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_v11_a2",
        "text": "Because valuation is just an imaginary vibe number, and we felt like asking for ₹50 Crore today.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Valuation ko imaginary vibe number bol diya?! DANDA padega!",
        "feedback": "Treating investor capital like a game of mood swings is fatal.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "Valuation is not a vibe. It is math, risk, and expected cash return. OUT."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Vibe number?! Yeh danda bhi meri taraf se ek vibe hai! BAAHAR NIKLO!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai vibe check fail ho gaya tumhara!"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Disrespectful and juvenile attitude."
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_problem_12",
    "category": "problem",
    "askerId": "vineeta",
    "questionText": "What is the consumer education friction: how difficult is it to convince an ordinary shopper to adopt your new format?",
    "hinglishText": "Naya format ya naya ingredient samajhne mein customer kitna waqt lagata hai? Education cost ad burn ko kitna badhati hai?",
    "contextHint": "Format education increases initial CAC; simplified messaging keeps it low.",
    "answers": [
      {
        "id": "v_p12_a1",
        "text": "We paired the new ingredient with a familiar daily ritual (morning tea replacement). Zero new habits required, keeping our trial CAC identical to standard tea brands.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Piggybacking on an existing ingrained habit eliminates consumer resistance.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "Attaching to an existing morning ritual removes the adoption barrier completely. Brilliant product strategy."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Morning chai ritual tap karna is a billion-dollar hack!"
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Customer ko naya habit seekhna nahi padega, smart."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Reduces category creation friction."
          }
        }
      },
      {
        "id": "vineeta_problem_12_ans_good",
        "text": "We validated this with 250 paying urban customers, though we are still formalizing our feedback loops.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_problem_12_ans_mediocre",
        "text": "Customers seem to like it when we give them free samples outside metro stations, but tracking repeats is tough.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_p12_a2",
        "text": "Customers must read a 40-page scientific PDF and take an online quiz before they can open the cap.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Product kholne se pehle 40 page ka PDF aur exam dena padega?! DANDA!",
        "feedback": "Massive cognitive load kills consumer adoption immediately.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "laughing",
            "quote": "40 page PDF for a consumer product?! Nobody has the patience!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Exam le rahe ho customer ka?! Woh doosri dukaan chala jayega!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai UPSC exam thodi chal raha hai yahan!"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Absurd user friction."
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_gross_margin_13",
    "category": "gross_margin",
    "askerId": "vineeta",
    "questionText": "What percentage of your Average Order Value (AOV) is eaten up by courier shipping and logistics fees?",
    "hinglishText": "Agar aapka AOV ₹450 hai aur shipping ₹90 lagti hai, toh 20% toh seedha delivery partner le gaya! Shipping economics kaise solve ki?",
    "contextHint": "Raising AOV via bundles, minimum order value thresholds (e.g. Free shipping above ₹699).",
    "answers": [
      {
        "id": "v_gm13_a1",
        "text": "We instituted a ₹799 minimum free shipping threshold, pushing our blended AOV to ₹920. Logistics costs dropped from 18% to 8.2% of net order value.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "8.2% logistics cost ratio achieved via ₹920 basket AOV",
          "valueDescription": "profitable_margins"
        },
        "feedback": "D2C logistics mastery. Boosting AOV amortizes fixed last-mile shipping charges.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "Pushing AOV to ₹920 cuts courier drag to 8.2%! You understand the true levers of D2C profitability."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Logistics margin leak band kar di, excellent."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Free shipping hurdle drives cart upsell beautifully."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Textbook basket optimization."
          }
        }
      },
      {
        "id": "vineeta_gross_margin_13_ans_good",
        "text": "We maintain a 52% gross margin, which gives reasonable buffer for standard distributor commissions.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_gross_margin_13_ans_mediocre",
        "text": "Margins are tight right now around 28%, but we hope suppliers will cut prices out of goodwill when we scale.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_gm13_a2",
        "text": "We offer free delivery on a ₹49 single pen and pay ₹80 to the courier company from our own pocket.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "₹49 ke item pe ₹80 courier charge jeb se bhar rahe ho?! DANDA!",
        "feedback": "Negative unit economics on low-ticket single item delivery.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "Losing ₹31 on every single order just on courier! Business suicide."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Courier waale ke liye dhandha chala rahe ho tum! Seedha band karo!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Courier delivery boy tumse ameer ho jayega!"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Completely unviable math. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_sustainability_14",
    "category": "sustainability",
    "askerId": "vineeta",
    "questionText": "Are your clean claims scientifically verified, or are you just jumping on clean-beauty greenwashing buzzwords?",
    "hinglishText": "Dabba pe \"100% natural, chemical free\" likhna aasan hai. Par water bhi chemical hota hai! Real clean certification kya hai?",
    "contextHint": "EWG verified, dermatologically tested, zero harmful parabens/phthalates.",
    "answers": [
      {
        "id": "v_su14_a1",
        "text": "EWG-verified formulations with complete CAS registry transparency. We published every ingredient concentration on our website; certified cruelty-free by PETA.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "No greenwashing. True ingredient scientific integrity.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "EWG verified and full CAS ingredient transparency! Genuine science, zero greenwashing."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Clinical honesty builds true long-term trust."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "At least jhooth bolke dhandha nahi kar rahe."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Honest branding connects deeply today."
          }
        }
      },
      {
        "id": "vineeta_sustainability_14_ans_good",
        "text": "We use recyclable packaging and follow standard state pollution board compliance guidelines.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_sustainability_14_ans_mediocre",
        "text": "We think green packaging is a good idea and plan to look into eco-friendly bags next year.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_su14_a2",
        "text": "We claim our product is 100% organic, chemical-free, gluten-free, wireless, and cures all diseases without any proof.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "FMCG product ko wireless aur sab bimariyon ka ilaj bol diya?! DANDA!",
        "feedback": "False and misleading advertising invites immediate ASCI ban and police complaints.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "ASCI consumer complaint ban will hit you next week. Fraudulent claims. OUT!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Wireless biscuit?! Sharam aati hai aise claims karte hue?!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Wireless shampoo hai kya bhai?! Haha!"
          },
          "namita": {
            "emotion": "angry",
            "quote": "Grossly deceptive and illegal marketing. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_cac_ltv_15",
    "category": "cac_ltv",
    "askerId": "vineeta",
    "questionText": "What is your blended CAC when paid Meta and Google ads hit audience saturation at ₹5 Crore monthly spend?",
    "hinglishText": "Scale pe digital ad costs explode hoti hain. Jab ad spend 10x badhega, toh blended CAC kitna jump karega?",
    "contextHint": "Organic channel contribution, retail presence, and brand recall buffer CAC degradation.",
    "answers": [
      {
        "id": "v_cac15_a1",
        "text": "Because our organic search volume grows 18% MoM and our offline distributor presence creates retail pull, our projected blended CAC rises by only 14% at 10x scale.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Grounded sensitivity model accounts for organic channels mitigating ad saturation.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "Realistic modeling of CAC degradation under scale. Very thoughtful CFO perspective."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Ad spend badhne pe dhandha fail nahi hoga, good."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Omnichannel presence shields against ad inflation."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Sound econometric forecasting."
          }
        }
      },
      {
        "id": "vineeta_cac_ltv_15_ans_good",
        "text": "Our blended customer acquisition cost is around ₹480 with an LTV of ₹1,400 across 6-month cycles.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_cac_ltv_15_ans_mediocre",
        "text": "We spend whatever is left in our bank account on Meta ads and hope people click the link.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_cac15_a2",
        "text": "We assume CAC will permanently stay at ₹10 because Mark Zuckerberg is our personal friend.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Mark Zuckerberg personal dost hai isliye CAC ₹10 rahega?! DANDA!",
        "feedback": "Delusional fantasy of static acquisition costs at scale.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "Childish assumption. Ad saturation is the number 1 killer of D2C startups."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Mark Zuckerberg tere dhandhe ke liye ad rates discount karega?! Dhandha band karo!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Mark ko WhatsApp karke pucho zara!"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Complete absence of market realism."
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_scalability_16",
    "category": "scalability",
    "askerId": "vineeta",
    "questionText": "How are you funding Modern Trade retail listing fees (slotting allowances) for Reliance, Spencer’s, and Nature’s Basket?",
    "hinglishText": "Modern Trade supermarkets shelf pe rakhne ke lakhon rupaye listing fee maangte hain. Retail shelf expansion ka cash budget kahan se aayega?",
    "contextHint": "Select city pilots, high SKU velocity negotiations, and distributor shared listing fees.",
    "answers": [
      {
        "id": "v_sc16_a1",
        "text": "We negotiated pay-per-performance listing terms linked to minimum throughput, pilot in 80 top-performing stores first, with 40% of listing costs co-funded by our regional distributor.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Shrewd retail negotiation protects cash burn from predatory supermarket slotting fees.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "Distributor co-funded listing fees! That is how an experienced retail operator protects margins."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "Supermarket ko seedha cheque mat do, velocity prove karke negotiate karo."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Top 80 stores pilot is the right lean rollout."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Prudent capital deployment in modern retail."
          }
        }
      },
      {
        "id": "vineeta_scalability_16_ans_good",
        "text": "We have vetted secondary co-packers and established regional warehouse partnerships to handle 3x volume.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_scalability_16_ans_mediocre",
        "text": "If orders spike, our family and friends will stay up all night packing boxes in our garage.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_sc16_a2",
        "text": "We paid ₹50 Lakhs upfront cash to list all 20 SKUs in 500 supermarkets where nobody buys them and they gather dust on bottom shelves.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Dust gathering bottom shelf ke liye ₹50 Lakh listing fee udha di?! DANDA!",
        "feedback": "Burning working capital on bottom-shelf placement leads to product de-listing and dead stock write-offs.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "angry",
            "quote": "Bottom shelf placement with zero pull! Retailers will de-list you and charge exit penalties."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Supermarket walon ko free mein ₹50 Lakh deke aa gaye!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bottom shelf pe dhabba kaun dekhega?"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Disastrous retail contract execution."
          }
        }
      }
    ]
  },
  {
    "id": "vineeta_execution_17",
    "category": "execution",
    "askerId": "vineeta",
    "questionText": "How strict is your warehouse First-In-First-Out (FIFO) batch management to avoid expired stock write-offs?",
    "hinglishText": "Agar warehouse boy purana stock aage aur naya stock peeche na rakhe, toh 6 mahine purana maal expire hoke kachra ho jata hai. FIFO system kya hai?",
    "contextHint": "WMS (Warehouse Management System) batch tracking and automated expiry triggers.",
    "answers": [
      {
        "id": "v_ex17_a1",
        "text": "Our cloud WMS mandates batch barcode scan verification before carton seal; any batch with <70% remaining shelf life is automatically diverted to flash partner channels.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Automated warehouse intelligence eliminates expired inventory write-offs.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "impressed",
            "quote": "Cloud WMS batch gating! Prevents toxic inventory write-offs before they happen."
          },
          "ashneer": {
            "emotion": "impressed",
            "quote": "System driven dhandha hai, manual mistakes nahi hongi."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Smart inventory routing."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Impeccable operational governance."
          }
        }
      },
      {
        "id": "vineeta_execution_17_ans_good",
        "text": "Our core team handles daily operations smoothly, though we need to recruit a senior supply chain lead.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "vineeta_execution_17_ans_mediocre",
        "text": "We manage all inventory, accounts, and courier tracking using one giant shared WhatsApp group.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "v_ex17_a2",
        "text": "All boxes are thrown into a mountain pile; workers dig out random boxes from underneath with a broom.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Warehouse mein broom se random box nikalte ho?! DANDA!",
        "feedback": "Medieval warehouse operations guarantee severe inventory loss.",
        "sharkReactions": {
          "vineeta": {
            "emotion": "laughing",
            "quote": "Jhadu se inventory management?! Medieval warehouse comedy!"
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Broom se dhandha chala rahe ho?! Godown mein aag lag jayegi!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai barcode scanner khareed lo!"
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Complete operational incompetence."
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_val_1",
    "category": "valuation",
    "askerId": "ashneer",
    "questionText": "How on earth did you calculate your valuation ask, or did you pluck it from thin air?",
    "hinglishText": "Yeh jo valuation maang rahe ho, iska kya logic hai bhai? Ya sapne mein number aaya aur slide pe daal diya?",
    "contextHint": "Tie your valuation multiple to current ARR, growth rate, and comparable industry deals.",
    "answers": [
      {
        "id": "a_v1_a1",
        "text": "Our ask is based on a conservative 6x trailing ARR multiple. We grew 3x YoY, so forward multiple is under 2.5x with positive EBITDA.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "valuation",
          "claimText": "6x trailing ARR multiple with positive EBITDA",
          "valueDescription": "grounded_valuation"
        },
        "feedback": "Masterclass valuation defense! Grounded in multiples, growth, and cash flow.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Theek hai, 6x ARR is grounded. At least hawa mein baat nahi kar rahe."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Sensible pricing. Shows you respect investor capital."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Reasonable ask! Dil jeet liya boss!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Very mature valuation expectations. A rare pleasure to see."
          }
        },
        "followUp": {
          "challengerId": "ashneer",
          "challengeText": "Pehle tumne margins aur burn ka hisaab bataya. Agar growth 20% slow ho gayi toh cash kab tak chalega?",
          "hinglishText": "Agar agle 6 mahine mein growth target miss ho gaya, toh runway kitne din ka bacha hai?",
          "interruptionContext": "Cashneer grills on runway buffer and burn stress-test",
          "responses": [
            {
              "id": "a_v1_f1",
              "text": "Our fixed overheads are lean; we can cut ad spend by 40% immediately and survive 14 months on zero revenue.",
              "quality": "strong_defense",
              "points": 10,
              "reaction": {
                "emotion": "impressed",
                "quote": "Yeh hui na dhandhe ki baat. Downside protection calculate karke aaye ho."
              }
            },
            {
              "id": "a_v1_f2",
              "text": "Sir, growth kabhi slow nahi hogi! Hum 24 ghante prayer karenge!",
              "quality": "flustered",
              "points": -10,
              "dandaTrigger": true,
              "dandaMessage": "Risk management ke naam pe prayer?! DANDA!",
              "reaction": {
                "emotion": "angry",
                "quote": "Yeh valuation hai ya birthday ka wish?! Dhandha reality pe chalta hai!"
              }
            }
          ]
        }
      },
      {
        "id": "a_v1_a2",
        "text": "We benchmarked against recent US and Indian seed-stage deals in our sector, accounting for our 85% customer NPS score.",
        "quality": "good",
        "points": 15,
        "dandaTrigger": false,
        "claim": {
          "metric": "valuation",
          "claimText": "US/India seed deal benchmarks",
          "valueDescription": "benchmark_valuation"
        },
        "feedback": "Reasonable peer benchmarking, though US multiples do not always translate to India.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "listening",
            "quote": "Silicon Valley ke multiple India mein nahi chalte bhai. Par theek hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Acceptable baseline for seed stage."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "High NPS gives pricing power."
          },
          "namita": {
            "emotion": "listening",
            "quote": "Comparable benchmarking is standard."
          }
        }
      },
      {
        "id": "ashneer_val_1_ans_mediocre",
        "text": "We calculated our valuation based on how much money we need to buy inventory for the next 2 years.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_v1_a3",
        "text": "Because in 5 years we will be worth ₹1,000 Crore, so right now at ₹50 Crore you are getting a 95% discount!",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Future fantasy unicorn discount calculation?! DANDAAA!",
        "feedback": "ARROGANT BLUNDER! Demanding today’s valuation based on unearned 5-year fantasies.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Bhai tu pehle 1 Crore kama ke dikha! Sapne bech raha hai mujhe?! Doglapan band kar!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai humein discount de rahe ho ya khud ko bewakoof bana rahe ho?!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Unsubstantiated forward projection."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Completely ungrounded arrogance. I am OUT."
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_debt_2",
    "category": "funding_use",
    "askerId": "ashneer",
    "questionText": "Do you have any hidden debts, high-interest loans, or informal borrowed money on the balance sheet?",
    "hinglishText": "Balance sheet pe koi secret loan, doston ka udhaar ya high interest karz toh nahi chhupa rakha? Sach sach batao!",
    "contextHint": "Investors audit every liability before signing a term sheet.",
    "answers": [
      {
        "id": "a_d2_a1",
        "text": "Zero external debt. Clean cap table with fully paid-up capital and audited balance sheets filed on MCA on time every year.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "claim": {
          "metric": "burn",
          "claimText": "Zero debt and clean cap table",
          "valueDescription": "zero_debt"
        },
        "feedback": "Impeccable balance sheet hygiene.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Cap table saaf hai. Na koi loan shark ka chakkar, na sir pe danda."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Very clean governance."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Peace of mind investments!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Strict financial discipline."
          }
        }
      },
      {
        "id": "ashneer_debt_2_ans_good",
        "text": "60% deployed to build inventory and retail presence, with 40% reserved for targeted digital awareness.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_debt_2_ans_mediocre",
        "text": "We will spend it wherever the biggest emergency pops up first, mostly online ads and buffer.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_d2_a2",
        "text": "I took ₹40 Lakh from my father-in-law at 24% annual interest, and he attends all our board meetings.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "claim": {
          "metric": "burn",
          "claimText": "Messy predatory loan from father-in-law at 24%",
          "valueDescription": "heavy_debt"
        },
        "dandaMessage": "24% interest loan from father-in-law on board?! DANDA!",
        "feedback": "Messy family debt at predatory rates guarantees governance deadlock.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "24% interest pe sasur ji ka loan?! Humara paisa unka karz chukane jayega kya?!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Family drama in the boardroom! Main out hoon boss!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Cap table nightmare."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Impossible governance situation. I am OUT."
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_salary_3",
    "category": "execution",
    "askerId": "ashneer",
    "questionText": "How much salary are you as the founder drawing from the company each month right now?",
    "hinglishText": "Aap khud mahine ka kitna salary nikal rahe ho company se? Sach sach batao!",
    "contextHint": "Seed-stage founders must draw survival salaries, not corporate market packages.",
    "answers": [
      {
        "id": "a_s3_a1",
        "text": "Modest ₹45,000/month just for basic living expenses. All free cash flow is reinvested directly into inventory.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "True founder sacrifice and hunger.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Founder bhookha hai dhandhe ke liye. Mujhe aisi commitment pasand hai."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Shows skin in the game."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Hustle level 100!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Prudent and realistic personal burn."
          }
        }
      },
      {
        "id": "ashneer_salary_3_ans_good",
        "text": "Our core team handles daily operations smoothly, though we need to recruit a senior supply chain lead.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_salary_3_ans_mediocre",
        "text": "We manage all inventory, accounts, and courier tracking using one giant shared WhatsApp group.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_s3_a2",
        "text": "We pay ourselves ₹6 Lakh per month each because our time is extremely valuable.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Zero profit company se ₹6 Lakh salary?! DANDA!",
        "feedback": "Drawing fat executive salaries while burning investor seed money is disqualifying.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Company ghate mein hai aur tu ₹6 lakh salary le raha hai?! Doglapan ki hadd hai!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "CEO sahab, company ko pehle ₹6 lakh kamane toh do!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Misaligned incentives. Completely out."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Self-serving founder behavior. Disgraceful."
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_gross_margin_4",
    "category": "gross_margin",
    "askerId": "ashneer",
    "questionText": "Are you making actual net cash on every sale, or are you secretly subsidizing every customer from investor money?",
    "hinglishText": "Yeh jo orders aa rahe hain, har order pe jeb mein paisa bachta hai ya customer ko apne ghar se biryani khila rahe ho?",
    "contextHint": "Contribution Margin 2 must be positive after packaging, payment gateway, and shipping.",
    "answers": [
      {
        "id": "a_gm4_a1",
        "text": "Contribution Margin 2 is strictly positive at +₹142 per order after all direct packaging, gateway fees, and logistics. We do not sell at a loss.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "Positive +₹142 Contribution Margin 2 per order",
          "valueDescription": "profitable_margins"
        },
        "feedback": "Real business discipline. Positive CM2 proves every transaction strengthens the company.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Har order pe ₹142 jeb mein bachta hai. Isko bolte hain dhandha!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Positive CM2 from day one is gold."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Solid unit economics boss!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Healthy commercial hygiene."
          }
        }
      },
      {
        "id": "ashneer_gross_margin_4_ans_good",
        "text": "We maintain a 52% gross margin, which gives reasonable buffer for standard distributor commissions.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_gross_margin_4_ans_mediocre",
        "text": "Margins are tight right now around 28%, but we hope suppliers will cut prices out of goodwill when we scale.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_gm4_a2",
        "text": "We lose ₹180 per order right now, but we believe once we have 10 million users, magic will happen!",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "claim": {
          "metric": "margins",
          "claimText": "Losing ₹180 per order on discounts",
          "valueDescription": "negative_margins"
        },
        "dandaMessage": "Per order ₹180 loss aur 10 million pe magic hoga?! DANDA!",
        "feedback": "Scaling negative unit economics means you go bankrupt 10x faster.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Magic hoga?! Bhai dhandha chalana hai ya circus ka jadu dikhana hai?! DANDA padega!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai magic nahi, seedha company band hone ka tamasha hoga!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Exponential scaling of losses."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Completely irrational fantasy. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_revenue_5",
    "category": "revenue",
    "askerId": "ashneer",
    "questionText": "Don’t show me GMV fantasy numbers! What is the real cash that landed in your current bank account last month?",
    "hinglishText": "Yeh GMV, platform throughput aur booked orders ka chutiyapa band karo! Pichle mahine bank account mein actual net cash kitna transfer hua?",
    "contextHint": "Net collected revenue after returns, cancellations, and merchant discounts.",
    "answers": [
      {
        "id": "a_r5_a1",
        "text": "Net collected cash in our HDFC current account last month was ₹78.4 Lakhs, verified by our statutory GST return filings.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Unambiguous bank balance verification. Real cash in the account.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "₹78.4 Lakh actual bank statement cash. Yeh sunke dimaag thanda hua."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "GST return verified cash inflows. No fluff."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Solid net collection boss."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Audited statutory evidence."
          }
        }
      },
      {
        "id": "ashneer_revenue_5_ans_good",
        "text": "Consistent month-on-month sales with steady average order value, though growth slows slightly in off-season.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_revenue_5_ans_mediocre",
        "text": "Revenue goes up and down depending on how much we push our personal Instagram stories that week.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_r5_a2",
        "text": "Our GMV is ₹10 Crore, but after 80% cancellations and fake orders, actual cash in bank is ₹12,000.",
        "quality": "blunder",
        "points": -18,
        "dandaTrigger": true,
        "dandaMessage": "₹10 Crore GMV par bank mein sirf ₹12,000?! BAAHAR NIKLO! DANDA!",
        "feedback": "Extreme vanity GMV hiding 80% cancellation fraud.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "₹10 Crore bolke bank mein ₹12,000 bacha hai?! Doglapan ki hadd paar kar di tumne!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai ₹12,000 mein toh tank ka light bill bhi nahi bharta!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Fraudulent presentation of metrics."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Gross deception. I am completely OUT."
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_cac_ltv_6",
    "category": "cac_ltv",
    "askerId": "ashneer",
    "questionText": "If you turn off Facebook and Instagram ads today, does your revenue drop to zero by tomorrow morning?",
    "hinglishText": "Agar Meta aur Google ad campaign abhi band kar dein, toh kya kal subah orders zero ho jayenge? Organic dhandha kitna hai?",
    "contextHint": "Addiction to paid ads indicates lack of real brand loyalty or product pull.",
    "answers": [
      {
        "id": "a_cac6_a1",
        "text": "Even when we paused all ads for 10 days during Diwali, organic search and direct repeat traffic maintained 62% of baseline volume.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "traction",
          "claimText": "62% revenue maintained with zero ad spend",
          "valueDescription": "high_validation"
        },
        "feedback": "Exceptional organic brand resilience! Proven independence from paid ads.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Ad band karke bhi 62% volume tik raha hai! Matlab product mein dam hai, ad ka nasha nahi hai."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Strong organic baseline."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Real brand pull right there!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "True customer loyalty tested under fire."
          }
        }
      },
      {
        "id": "ashneer_cac_ltv_6_ans_good",
        "text": "Our blended customer acquisition cost is around ₹480 with an LTV of ₹1,400 across 6-month cycles.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_cac_ltv_6_ans_mediocre",
        "text": "We spend whatever is left in our bank account on Meta ads and hope people click the link.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_cac6_a2",
        "text": "If we stop ads for 5 minutes, our website looks like an abandoned graveyard.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "claim": {
          "metric": "traction",
          "claimText": "Zero organic retention when ads stop",
          "valueDescription": "zero_retention"
        },
        "dandaMessage": "Ad band karte hi website kabristan ban jati hai?! DANDA!",
        "feedback": "A business with 100% ad addiction is an advertising agency, not a brand.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Kabristan ban jati hai?! Toh tu Zuckerberg ka sales agent hai, founder nahi hai!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai Meta ke share khareed lete isse achha!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Zero brand equity."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Completely unsustainable reliance on ad spend."
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_market_size_7",
    "category": "market_size",
    "askerId": "ashneer",
    "questionText": "Don’t tell me India has 140 Crore people! How many people actually have ₹500 in their pocket to buy your item today?",
    "hinglishText": "140 crore ka gyan har founder aake deta hai. Asli paying customer India mein kitne hain? 2 crore ya 3 crore?",
    "contextHint": "Realistic Indian middle-class consumer wallet share analysis.",
    "answers": [
      {
        "id": "a_ms7_a1",
        "text": "We focus strictly on the top 25 million tax-paying, UPI-transacting urban consumers. That is a tight, addressable ₹4,200 Crore market where our penetration is currently 0.8%.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Truthful, non-delusional Indian consumer sizing. 25M transacting consumers is the reality.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "25 million UPI paying consumers! Sahi pakda hai. Yeh India ki asli purchasing power hai."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Accurate demographic filter."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Spot on targeting boss!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Refreshingly honest market sizing."
          }
        }
      },
      {
        "id": "ashneer_market_size_7_ans_good",
        "text": "We estimate the Tier-1 urban middle-class market at roughly ₹1,500 Crore, focusing on metro clusters first.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_market_size_7_ans_mediocre",
        "text": "Everyone with a smartphone is a potential customer eventually, so the market must be huge.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_ms7_a2",
        "text": "Every single Indian from Kashmir to Kanyakumari is dying to buy our product; they just don’t know it yet!",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Kashmir se Kanyakumari sab mar rahe hain khareedne ke liye?! DANDA!",
        "feedback": "Delusional founder arrogance completely ignoring Indian income distribution.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Koi nahi mar raha bhai! Tu khud sapno mein mar raha hai! Dhandha numbers pe banta hai!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai pehle apne building ke 10 padosi ko bech ke dikha do!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Zero market reality."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Hopeless arrogance. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_problem_8",
    "category": "problem",
    "askerId": "ashneer",
    "questionText": "My corner kirana store uncle sells this exact same item for half the price! Why does your startup even exist?",
    "hinglishText": "Gali ke kone pe kirana dukaan waala chacha yahi cheez aadhe daam pe bechta hai. Tumhare paas aane ka kya tuk hai bhai?",
    "contextHint": "Quality consistency, lab purity, shelf life, and measurable customer convenience.",
    "answers": [
      {
        "id": "a_p8_a1",
        "text": "Corner stores sell adulterated, unbranded loose items with 18% moisture degradation. We provide vacuum-sealed NABL-certified purity and standardized potency with 100% money-back guarantee.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "feedback": "Standardization and lab purity justify the value differential over loose commodities.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Kirana dukaan ki milawat ka problem solve kar rahe ho, valid point."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Standardized potency is the core differentiator."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Good value defense."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Quality upgrade works."
          }
        }
      },
      {
        "id": "ashneer_problem_8_ans_good",
        "text": "We validated this with 250 paying urban customers, though we are still formalizing our feedback loops.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_problem_8_ans_mediocre",
        "text": "Customers seem to like it when we give them free samples outside metro stations, but tracking repeats is tough.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_p8_a2",
        "text": "Kirana chacha is not trendy and doesn’t have a minimalist pastel Instagram page like us.",
        "quality": "blunder",
        "points": -15,
        "dandaTrigger": true,
        "dandaMessage": "Kirana chacha trendy nahi hai isliye startup khola?! DANDA!",
        "feedback": "Disrespecting the efficiency of Indian unorganized retail is a founder death-trap.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Kirana chacha ka dhandha 40 saal se profit mein hai, aur tu loss mein hai! Chacha se dhandha seekh!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Chacha ka turnover tumse 10x zyada hoga bhai!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Condescending and ignorant of Indian retail."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Zero appreciation of grassroot commerce."
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_scalability_9",
    "category": "scalability",
    "askerId": "ashneer",
    "questionText": "Why are you burning investor equity on building your own expensive factory instead of asset-light contract manufacturing?",
    "hinglishText": "Apni factory kholne ke liye crore rupaye kyu barbaad kar rahe ho jab market mein 50 certified co-packers free baithe hain?",
    "contextHint": "Asset-light scaling maximizes return on capital employed (ROCE).",
    "answers": [
      {
        "id": "a_sc9_a1",
        "text": "We are 100% asset-light! We lease verified GMP capacity across 2 vetted contract manufacturers on pay-per-unit terms. Zero capex lock-up.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "burn",
          "claimText": "100% asset-light contract manufacturing with zero capex",
          "valueDescription": "disciplined_scaling"
        },
        "feedback": "Asset-light discipline preserves precious equity for customer acquisition and working capital.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Asset-light! Factory mein cement-eent lagane se dhandha nahi banta. Good move."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Keeps ROCE high and fixed costs minimal."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Lean and agile scaling."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Smart capacity utilization."
          }
        }
      },
      {
        "id": "ashneer_scalability_9_ans_good",
        "text": "We have vetted secondary co-packers and established regional warehouse partnerships to handle 3x volume.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_scalability_9_ans_mediocre",
        "text": "If orders spike, our family and friends will stay up all night packing boxes in our garage.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_sc9_a2",
        "text": "I wanted to see my name written in big gold letters on the front gate of a 50-acre factory.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Factory gate pe apna naam likhne investor ka paisa phookoge?! DANDA!",
        "feedback": "Founder vanity projects destroy early venture capital.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Gate pe naam likhwana hai toh graveyard mein jaao! Humara paisa factory ki boundary wall mein nahi lagega!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Gold letters mein naam likhwayenge! Wah!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Monumental vanity over commercial sanity."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Egocentric misuse of funds. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_valuation_10",
    "category": "valuation",
    "askerId": "ashneer",
    "questionText": "You did ₹20 Lakhs in sales last year, and you are asking for a ₹100 Crore valuation. Bhai, kya phook ke aaye ho?!",
    "hinglishText": "Saal ka dhandha ₹20 Lakh aur valuation ₹100 Crore! Yeh 500x multiple kahan se laaye bhai? Kuch bhi bolte ho?!",
    "contextHint": "Founders must drastically align their valuation ask with trailing commercial traction.",
    "answers": [
      {
        "id": "a_v10_a1",
        "text": "My apologies, our original deck was modeled on US tech multiples. Based on ground realities, we are open to revising to ₹6 Crore pre-money to bring in your expertise.",
        "quality": "great",
        "points": 24,
        "dandaTrigger": false,
        "claim": {
          "metric": "valuation",
          "claimText": "Revised grounded pre-money valuation of ₹6 Crore",
          "valueDescription": "grounded_valuation"
        },
        "feedback": "Humility and commercial flexibility under pressure wins shark respect.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Galti maani aur aukaat ke mutaabiq ₹6 Crore pe aaye. Yeh hota hai dhandhe ka lachilapan."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Pragmatic founder, deal ban sakti hai!"
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Realistic adjustment."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Sensible listening capability."
          }
        }
      },
      {
        "id": "ashneer_valuation_10_ans_good",
        "text": "Valuation is anchored to roughly 4x forward revenue based on current quarterly run rates.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_valuation_10_ans_mediocre",
        "text": "We calculated our valuation based on how much money we need to buy inventory for the next 2 years.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_v10_a2",
        "text": "Actually, ₹100 Crore is too cheap. After this pitch airs on TV, we will be worth ₹500 Crore minimum!",
        "quality": "blunder",
        "points": -18,
        "dandaTrigger": true,
        "dandaMessage": "TV pe aane ke baad ₹500 Crore worth bol diya?! DANDAAA!",
        "feedback": "Unbelievable delusion. Assuming TV airtime equals sustainable business value.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "TV pe aane se dhandha nahi banta! BAAHAR NIKAL! Yeh sab doglapan hai!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai ₹500 Crore ka sapna dekh ke TV mat dekho!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Terminal detachment from financial gravity."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Beyond redemption. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_execution_11",
    "category": "execution",
    "askerId": "ashneer",
    "questionText": "Are both co-founders 100% full-time, or is one of you doing a day-job in an MNC while moonlighting here on weekends?",
    "hinglishText": "Donon founders full time hain ya ek banda TCS mein 9-to-5 naukri karke weekend pe startup ka drama kar raha hai?",
    "contextHint": "Venture investors require full skin in the game from all key founders.",
    "answers": [
      {
        "id": "a_ex11_a1",
        "text": "Both co-founders resigned 14 months ago; we work 14 hours a day, 7 days a week, and have invested ₹35 Lakhs of our personal life savings.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "100% commitment with personal life savings on the line.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Dono full time hain aur khud ke ₹35 Lakh lagaye hain. Skin in the game hai."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Real commitment. That is what builds durable companies."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Hustle mode on 24x7!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Total dedication."
          }
        }
      },
      {
        "id": "ashneer_execution_11_ans_good",
        "text": "Our core team handles daily operations smoothly, though we need to recruit a senior supply chain lead.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_execution_11_ans_mediocre",
        "text": "We manage all inventory, accounts, and courier tracking using one giant shared WhatsApp group.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_ex11_a2",
        "text": "My co-founder works at Infosys and only checks our startup WhatsApp group during his evening tea break.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Co-founder tea break pe WhatsApp pe startup chala raha hai?! DANDA!",
        "feedback": "Part-time moonlighting founders never build enduring venture-scale businesses.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Tea break pe startup chala raha hai?! Use bol Infosys mein hi baithe, yahan na aaye!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Part time founder full time valuation maang raha hai!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Unacceptable founder distraction."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Lack of serious dedication. OUT."
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_funding_use_12",
    "category": "funding_use",
    "askerId": "ashneer",
    "questionText": "Why did you spend ₹40 Lakhs building a custom software app when an off-the-shelf Shopify website costs ₹2,000/month?",
    "hinglishText": "App banane mein ₹40 Lakh kyu foonke jab standard Shopify pe ₹2,000 mein dhandha shuru ho sakta tha? Technical show-off kyu kiya?",
    "contextHint": "Avoid unnecessary tech engineering when no-code/SaaS solutions exist.",
    "answers": [
      {
        "id": "a_fu12_a1",
        "text": "We never built a custom app. We launched on standard Shopify at ₹2,500/month, keeping tech capex near zero and investing everything into inventory.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "burn",
          "claimText": "Lean SaaS tech stack with near zero fixed development burn",
          "valueDescription": "disciplined_scaling"
        },
        "feedback": "Smart founder practicality. Do not reinvent the wheel for basic e-commerce.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Shopify pe dhandha chala rahe ho, bewakoofo ki tarah app banane mein crore nahi jalaye. Sahi dimaag."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Keeps fixed burn exceptionally low."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Shopify works like a charm."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Prudent operational tooling."
          }
        }
      },
      {
        "id": "ashneer_funding_use_12_ans_good",
        "text": "60% deployed to build inventory and retail presence, with 40% reserved for targeted digital awareness.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_funding_use_12_ans_mediocre",
        "text": "We will spend it wherever the biggest emergency pops up first, mostly online ads and buffer.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_fu12_a2",
        "text": "We hired an agency in London to build a proprietary blockchain Web3 app with custom metaverse avatars just to sell socks.",
        "quality": "blunder",
        "points": -18,
        "dandaTrigger": true,
        "dandaMessage": "Moze bechne ke liye London agency se Web3 blockchain app banwaya?! DANDA!",
        "feedback": "Comical tech over-engineering burning seed funds on irrelevant buzzwords.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Moze bechne ke liye Web3 blockchain?! Tu pagal hai kya bhai?! DANDA padega seedha!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Metaverse mein moja kaun pehnega bhai?! Haha!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Astronomical capital misallocation."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Utterly ridiculous buzzword circus. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_sustainability_13",
    "category": "sustainability",
    "askerId": "ashneer",
    "questionText": "How many months of runway do you have in the bank right now before your company completely runs out of cash?",
    "hinglishText": "Agar main ek rupaya na doon, toh kitne mahine mein bank account ka balance zero ho jayega aur company band ho jayegi?",
    "contextHint": "Stress-test founder runway and desperation level.",
    "answers": [
      {
        "id": "a_su13_a1",
        "text": "We have 14 months of runway at current burn, and our core business is already operating at cash flow breakeven. We are raising to accelerate, not to survive.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "burn",
          "claimText": "14 months runway at cash flow breakeven",
          "valueDescription": "zero_debt"
        },
        "feedback": "Position of strength! Never pitch from desperation; pitch from profitable runway.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Breakeven pe ho aur 14 mahine ka runway hai. Tum mere paiso ke bina bhi zinda rahoge, yeh dhandhe ki taaqat hoti hai."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Negotiating from a position of absolute strength."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "No desperation, pure confidence!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Exemplary runway management."
          }
        }
      },
      {
        "id": "ashneer_sustainability_13_ans_good",
        "text": "We use recyclable packaging and follow standard state pollution board compliance guidelines.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_sustainability_13_ans_mediocre",
        "text": "We think green packaging is a good idea and plan to look into eco-friendly bags next year.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_su13_a2",
        "text": "We have 11 days of cash left, and if you don’t write a cheque right now, our landlord will lock our office door tomorrow.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "11 din ka cash bacha hai aur landlord bahar nikal raha hai?! DANDA!",
        "feedback": "Pitching on death’s doorstep destroys your valuation leverage.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "11 din ka runway?! Tum dhandha nahi bacha rahe, emergency oxygen maang rahe ho!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai itni late kyu aaye pitch karne?!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Extreme insolvency distress."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Imminent shutdown risk. OUT."
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_gross_margin_14",
    "category": "gross_margin",
    "askerId": "ashneer",
    "questionText": "If your raw material costs surge by 20% due to global commodity inflation, does your business instantly bleed to death?",
    "hinglishText": "Agar kal ko raw material 20% mehenga ho gaya, toh kya company ghate mein chali jayegi ya customer price hike bardasht karega?",
    "contextHint": "Pricing power and gross margin buffer absorb commodity shocks.",
    "answers": [
      {
        "id": "a_gm14_a1",
        "text": "Our 72% gross margin gives us a massive 15% shock cushion. Furthermore, our last 8% price increase had zero impact on monthly customer retention.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "72% gross margin with proven pricing power",
          "valueDescription": "profitable_margins"
        },
        "feedback": "True pricing power. Warren Buffett’s number one metric for an exceptional business.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Pricing power hai! Price badhaane par bhi customer nahi bhaga, isko kehte hain dhandha."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Exceptional gross margin buffer protects against stagflation."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Brand love allows price elasticity."
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Strong competitive moat."
          }
        }
      },
      {
        "id": "ashneer_gross_margin_14_ans_good",
        "text": "We maintain a 52% gross margin, which gives reasonable buffer for standard distributor commissions.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_gross_margin_14_ans_mediocre",
        "text": "Margins are tight right now around 28%, but we hope suppliers will cut prices out of goodwill when we scale.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_gm14_a2",
        "text": "If sugar or plastic increases by ₹2, we lose money on every unit and have to close down operations.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "₹2 raw material badhne pe company band ho jayegi?! DANDA!",
        "feedback": "Razor-thin margins with zero pricing power is an uninvestable commodity trap.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "₹2 mein company mar jayegi?! Toh yeh business nahi, aatmaghati dhandha hai! OUT!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Margin buffer hi zero hai boss."
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Fatal vulnerability to commodity price swings."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Completely fragile business model."
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_branding_15",
    "category": "branding",
    "askerId": "ashneer",
    "questionText": "A fancy logo, aesthetic pastel website, and cool Hinglish tagline don’t pay the bills! Where is the EBITDA profit?",
    "hinglishText": "Logo, tagline aur aesthetic photo shoot se bills nahi bharte bhai! Actual EBITDA profit kitna bachta hai sab kharcha kaatne ke baad?",
    "contextHint": "Net EBITDA conversion proves operational sustainability.",
    "answers": [
      {
        "id": "a_b15_a1",
        "text": "We closed last quarter with an audited 16.4% EBITDA profit margin on ₹2.1 Crore quarterly revenue. All our expansion is funded from internal cash accruals.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "margins",
          "claimText": "16.4% audited EBITDA profit margin",
          "valueDescription": "profitable_margins"
        },
        "feedback": "16.4% real EBITDA profit! Shuts down all skepticism instantly.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "16.4% EBITDA profit! Shabaash founder! Yeh sunkar mera dil khush ho gaya."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Real cash profits. Commendable discipline."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Profitable D2C is rare and beautiful boss!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Exemplary fiscal responsibility."
          }
        }
      },
      {
        "id": "ashneer_branding_15_ans_good",
        "text": "Clean, modern typography with clear ingredient callouts that appeal to younger urban consumers.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_branding_15_ans_mediocre",
        "text": "Our logo was designed by my cousin in college, and people say the colors look nice.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_b15_a2",
        "text": "EBITDA is an outdated boomer concept; modern startups measure success in Instagram hearts and vibes!",
        "quality": "blunder",
        "points": -18,
        "dandaTrigger": true,
        "dandaMessage": "EBITDA ko boomer concept bol diya?! Cashneer ne danda baja diya!",
        "feedback": "Mocking fundamental profitability is the fastest way to get kicked out of the tank.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "EBITDA boomer concept hai?! Tere ghar ka rashan Instagram ke hearts se aata hai kya?! BAAHAR NIKAL!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai hearts se bank EMI nahi bhari jaati!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Juvenile contempt for financial reality."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Grossly disrespectful and foolish. OUT!"
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_revenue_16",
    "category": "revenue",
    "askerId": "ashneer",
    "questionText": "How much money is stuck in uncollected trade debtors and marketplace payment holds right now?",
    "hinglishText": "Kitna paisa market mein doobne ki kagaar pe hai? Uncollected receivables kitne din purane hain?",
    "contextHint": "Receivable days >90 indicates high risk of bad debt write-offs.",
    "answers": [
      {
        "id": "a_r16_a1",
        "text": "Total debtors represent only 12 days of sales; 94% of our collections are completed automatically via escrow gateways within 72 hours. Provision for bad debts is under 0.1%.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "feedback": "Tight collections hygiene prevents cash flow choking.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "12 days debtors! Paisa market mein atka nahi hai, rotation tez hai."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Very tight cash collection control."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Smooth liquidity!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Zero bad debt risk."
          }
        }
      },
      {
        "id": "ashneer_revenue_16_ans_good",
        "text": "Consistent month-on-month sales with steady average order value, though growth slows slightly in off-season.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_revenue_16_ans_mediocre",
        "text": "Revenue goes up and down depending on how much we push our personal Instagram stories that week.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_r16_a2",
        "text": "We have ₹1.2 Crore stuck with shady distributors who stopped answering our phone calls 6 months ago.",
        "quality": "blunder",
        "points": -16,
        "dandaTrigger": true,
        "dandaMessage": "Shady distributor ₹1.2 Crore leke phone nahi utha raha?! DANDA!",
        "feedback": "Incompetent credit control resulting in massive write-offs.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "₹1.2 Crore doob gaya aur tum TV pe funding maang rahe ho taaki woh loss cover ho sake?! Doglapan!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Police complaint ki kya unke khilaaf?"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Disastrous receivables governance."
          },
          "namita": {
            "emotion": "rejecting",
            "quote": "Huge operational negligence. OUT."
          }
        }
      }
    ]
  },
  {
    "id": "ashneer_valuation_17",
    "category": "valuation",
    "askerId": "ashneer",
    "questionText": "If you fail to hit your milestone numbers in 12 months, will you give investors a down-round valuation adjustment without crying?",
    "hinglishText": "Agar 12 mahine mein target miss ho gaya, toh kya chupchap bina roye equity adjustment doge ya court jaoge?",
    "contextHint": "Investor anti-dilution protection and founder accountability.",
    "answers": [
      {
        "id": "a_v17_a1",
        "text": "Absolutely. We offer standard weighted-average anti-dilution protection and performance ratchets; if we miss our revenue milestones by >25%, we grant bonus equity warrants to compensate investors.",
        "quality": "great",
        "points": 25,
        "dandaTrigger": false,
        "claim": {
          "metric": "valuation",
          "claimText": "Standard anti-dilution and performance milestone ratchet",
          "valueDescription": "grounded_valuation"
        },
        "feedback": "Ultimate accountability! Putting founder equity on the line to back up financial promises.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "impressed",
            "quote": "Performance ratchet! Apne numbers pe vishwas hai aur accountability lene ki himmat hai. Respect."
          },
          "vineeta": {
            "emotion": "impressed",
            "quote": "Founder accountability at institutional venture level."
          },
          "aman": {
            "emotion": "impressed",
            "quote": "Dil jeet liya boss!"
          },
          "namita": {
            "emotion": "impressed",
            "quote": "Superb governance."
          }
        }
      },
      {
        "id": "ashneer_valuation_17_ans_good",
        "text": "Valuation is anchored to roughly 4x forward revenue based on current quarterly run rates.",
        "quality": "good",
        "points": 14,
        "dandaTrigger": false,
        "feedback": "Decent commercial logic, though investors wanted more concrete evidence.",
        "sharkReactions": {
          "namita": {
            "emotion": "listening",
            "quote": "Direction theek hai, par execution plan aur solid hona chahiye."
          },
          "ashneer": {
            "emotion": "listening",
            "quote": "Theek-thaak hai, par extra spark kahan hai?"
          },
          "aman": {
            "emotion": "listening",
            "quote": "Chalo theek hai boss, manageable hai."
          },
          "vineeta": {
            "emotion": "listening",
            "quote": "Reasonable point, though metrics need tightening."
          }
        }
      },
      {
        "id": "ashneer_valuation_17_ans_mediocre",
        "text": "We calculated our valuation based on how much money we need to buy inventory for the next 2 years.",
        "quality": "mediocre",
        "points": 5,
        "dandaTrigger": false,
        "feedback": "Vague and evasive response. Sharks expect crisp domain command.",
        "sharkReactions": {
          "namita": {
            "emotion": "confused",
            "quote": "Aap question deflect kar rahe hain, direct answer dijiye."
          },
          "ashneer": {
            "emotion": "angry",
            "quote": "Gol-gol ghumaana band karo! Seedha jawab do!"
          },
          "aman": {
            "emotion": "confused",
            "quote": "Bhai confidence thoda shaky lag raha hai."
          },
          "vineeta": {
            "emotion": "confused",
            "quote": "Lacks clarity and data backing."
          }
        }
      },
      {
        "id": "a_v17_a2",
        "text": "If I fail, it will be the fault of the economy, government, weather, and investors, but never mine!",
        "quality": "blunder",
        "points": -17,
        "dandaTrigger": true,
        "dandaMessage": "Har failure ka ilzam doosron pe daaloge?! DANDA!",
        "feedback": "Zero personal accountability makes a founder toxic to back.",
        "sharkReactions": {
          "ashneer": {
            "emotion": "angry",
            "quote": "Weather ki galti hai?! Mausam kharab tha isliye dhandha duba diya?! BAAHAR NIKAL YAHAN SE!"
          },
          "aman": {
            "emotion": "laughing",
            "quote": "Bhai mausam vibhag ko pitch karo!"
          },
          "vineeta": {
            "emotion": "rejecting",
            "quote": "Zero founder ownership."
          },
          "namita": {
            "emotion": "angry",
            "quote": "Immature victim mentality. OUT!"
          }
        }
      }
    ]
  }
];

// Helper to dynamically select a diverse 5-question arc for each playthrough
export function selectDynamicQuestionsForPlaythrough(
  startup: StartupData,
  count: number = 5,
  usedQuestionIds: string[] = []
): PitchQuestion[] {
  // Filter out questions already seen in this session to ensure no repeats
  const availablePool = ALL_PITCH_QUESTIONS.filter((q) => !usedQuestionIds.includes(q.id));
  const candidatePool = availablePool.length >= count ? availablePool : ALL_PITCH_QUESTIONS;

  // Arc of the Pitch (5 rounds with each shark taking center stage):
  // Round 1: Problem / Traction / Market Size (Namita or Demand)
  // Round 2: Product / Brand Differentiation / Gen-Z (Demand or Win-ita)
  // Round 3: Unit Economics / Gross Margins / CAC-LTV (Win-ita or Cashneer)
  // Round 4: Valuation / Real Cash / Profitability (Cashneer)
  // Round 5: Scalability / Governance / Execution (Namita or Win-ita or Demand)

  const r1Pool = candidatePool.filter(
    (q) => (q.category === 'problem' || q.category === 'market_size') && (q.askerId === 'namita' || q.askerId === 'aman')
  );
  const r2Pool = candidatePool.filter(
    (q) => (q.category === 'branding' || q.category === 'cac_ltv') && (q.askerId === 'aman' || q.askerId === 'vineeta')
  );
  const r3Pool = candidatePool.filter(
    (q) => (q.category === 'gross_margin' || q.category === 'execution') && (q.askerId === 'vineeta' || q.askerId === 'ashneer')
  );
  const r4Pool = candidatePool.filter(
    (q) => (q.category === 'valuation' || q.category === 'revenue') && q.askerId === 'ashneer'
  );
  const r5Pool = candidatePool.filter(
    (q) => (q.category === 'scalability' || q.category === 'funding_use' || q.category === 'sustainability')
  );

  const pickRandom = (arr: PitchQuestion[], fallbackList: PitchQuestion[]): PitchQuestion => {
    if (arr && arr.length > 0) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    return fallbackList[Math.floor(Math.random() * fallbackList.length)];
  };

  const selected: PitchQuestion[] = [];
  const pickedIds = new Set<string>();

  const addUnique = (candidate: PitchQuestion) => {
    if (!pickedIds.has(candidate.id)) {
      selected.push(candidate);
      pickedIds.add(candidate.id);
    }
  };

  addUnique(pickRandom(r1Pool, ALL_PITCH_QUESTIONS.filter(q => q.askerId === 'namita')));
  addUnique(pickRandom(r2Pool, ALL_PITCH_QUESTIONS.filter(q => q.askerId === 'aman')));
  addUnique(pickRandom(r3Pool, ALL_PITCH_QUESTIONS.filter(q => q.askerId === 'vineeta')));
  addUnique(pickRandom(r4Pool, ALL_PITCH_QUESTIONS.filter(q => q.askerId === 'ashneer')));
  addUnique(pickRandom(r5Pool, ALL_PITCH_QUESTIONS.filter(q => q.askerId === 'namita' || q.askerId === 'aman')));

  // If any slot was duplicate or empty, fill up to count from unpicked pool
  for (const q of candidatePool) {
    if (selected.length >= count) break;
    addUnique(q);
  }

  return selected.slice(0, count);
}

// Default initial question set for backwards compatibility
export const PITCH_QUESTIONS = ALL_PITCH_QUESTIONS.slice(0, 5);
