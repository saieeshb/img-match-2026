const DATA = {
 "overall": {
  "activeApplicants": 48050,
  "imgShareOfPool": 24.9,
  "analysisSample": 8943,
  "consentedMatched": 4429,
  "consentedNotMatched": 4541,
  "totalImgMatched": 5721,
  "totalImgNotMatched": 5964,
  "totalImg": 11685,
  "weightedMatchRate": 49.0,
  "reportHeadlineRate": 41.5,
  "totalPositions": 39589,
  "totalAllApplicants": 47343,
  "aggregate": [
   {
    "measure": "Contiguous ranks",
    "matched": "5.0",
    "notMatched": "2.0",
    "separates": true
   },
   {
    "measure": "USMLE Step 2 CK",
    "matched": "248",
    "notMatched": "242",
    "separates": true
   },
   {
    "measure": "Research experiences",
    "matched": "3.0",
    "notMatched": "3.0",
    "separates": false
   },
   {
    "measure": "Abstracts",
    "matched": "2.0",
    "notMatched": "2.0",
    "separates": false
   },
   {
    "measure": "Presentations",
    "matched": "2.0",
    "notMatched": "2.0",
    "separates": false
   },
   {
    "measure": "Publications",
    "matched": "3.0",
    "notMatched": "3.0",
    "separates": false
   },
   {
    "measure": "Work experiences",
    "matched": "3.0",
    "notMatched": "3.0",
    "separates": false
   },
   {
    "measure": "Volunteer experiences",
    "matched": "3.0",
    "notMatched": "3.0",
    "separates": false
   },
   {
    "measure": "Distinct specialties ranked",
    "matched": "1.0",
    "notMatched": "1.0",
    "separates": false
   },
   {
    "measure": "Has a Ph.D.",
    "matched": "2.2%",
    "notMatched": "2.0%",
    "separates": false
   },
   {
    "measure": "Has another graduate degree",
    "matched": "21.1%",
    "notMatched": "24.3%",
    "separates": false
   }
  ]
 },
 "metrics": [
  {
   "key": "contiguous_ranks",
   "label": "Contiguous ranks",
   "unit": "programs",
   "verified": false,
   "desc": "Programs ranked in the preferred specialty before a program from another specialty appears on the rank list.",
   "higherBetter": true
  },
  {
   "key": "step2ck",
   "label": "USMLE Step 2 CK",
   "unit": "score",
   "verified": true,
   "desc": "Primary-source score obtained by NRMP directly from the USMLE program. The only verified measure in this report.",
   "higherBetter": true
  },
  {
   "key": "publications",
   "label": "Publications",
   "unit": "count",
   "verified": false,
   "desc": "Peer-reviewed journal articles, book chapters, online publications, monographs and case reports. Split from a combined item for the first time in 2026.",
   "higherBetter": true
  },
  {
   "key": "abstracts",
   "label": "Abstracts",
   "unit": "count",
   "verified": false,
   "desc": "Abstracts accepted for conference presentation and subsequently published in a peer-reviewed journal. Split from a combined item for the first time in 2026.",
   "higherBetter": true
  },
  {
   "key": "presentations",
   "label": "Presentations",
   "unit": "count",
   "verified": false,
   "desc": "Poster or oral presentations at conferences or school research days. Split from a combined item for the first time in 2026.",
   "higherBetter": true
  },
  {
   "key": "research",
   "label": "Research experiences",
   "unit": "count",
   "verified": false,
   "desc": "Experiences serving as a member of a research team during medical, graduate or undergraduate school.",
   "higherBetter": true
  },
  {
   "key": "work",
   "label": "Work experiences",
   "unit": "count",
   "verified": false,
   "desc": "Paid experiences applying knowledge or skills to a field or job.",
   "higherBetter": true
  },
  {
   "key": "volunteer",
   "label": "Volunteer experiences",
   "unit": "count",
   "verified": false,
   "desc": "Experiences freely giving time and labour to a project, task or service.",
   "higherBetter": true
  },
  {
   "key": "specialties_ranked",
   "label": "Distinct specialties ranked",
   "unit": "specialties",
   "verified": false,
   "desc": "How many different specialties appear anywhere on the applicant's rank order list.",
   "higherBetter": null
  }
 ],
 "specialties": [
  {
   "name": "Pediatrics",
   "short": "Pediatrics",
   "positions": 3185,
   "allApplicants": 3023,
   "imgMatched": 542,
   "imgNotMatched": 249,
   "imgTotal": 791,
   "matchRate": 68.5,
   "allPerPos": 0.95,
   "imgPerPos": 0.25,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 422,
      "min": 1,
      "q1": 3.0,
      "median": 6.0,
      "q3": 11.0,
      "max": 31,
      "iqr": 8.0,
      "mean": 7.6,
      "sd": 5.8
     },
     "not_matched": {
      "n": 182,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 8,
      "iqr": 1.0,
      "mean": 1.7,
      "sd": 1.3
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 422,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 1.0,
      "max": 5,
      "iqr": 0.0,
      "mean": 1.2,
      "sd": 0.6
     },
     "not_matched": {
      "n": 182,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 1.0,
      "max": 4,
      "iqr": 0.0,
      "mean": 1.3,
      "sd": 0.6
     }
    },
    "step2ck": {
     "matched": {
      "n": 422,
      "min": 214,
      "q1": 232.0,
      "median": 240.0,
      "q3": 252.0,
      "max": 283,
      "iqr": 20.0,
      "mean": 241.0,
      "sd": 13.0
     },
     "not_matched": {
      "n": 182,
      "min": 209,
      "q1": 224.0,
      "median": 233.0,
      "q3": 245.0,
      "max": 274,
      "iqr": 21.0,
      "mean": 234.0,
      "sd": 13.0
     }
    },
    "research": {
     "matched": {
      "n": 422,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 45,
      "iqr": 3.0,
      "mean": 3.8,
      "sd": 5.1
     },
     "not_matched": {
      "n": 182,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 20,
      "iqr": 3.0,
      "mean": 3.7,
      "sd": 3.8
     }
    },
    "abstracts": {
     "matched": {
      "n": 422,
      "min": 0,
      "q1": 0.0,
      "median": 1.0,
      "q3": 3.0,
      "max": 31,
      "iqr": 3.0,
      "mean": 2.7,
      "sd": 4.3
     },
     "not_matched": {
      "n": 182,
      "min": 0,
      "q1": 0.0,
      "median": 1.0,
      "q3": 3.0,
      "max": 20,
      "iqr": 3.0,
      "mean": 2.5,
      "sd": 3.8
     }
    },
    "presentations": {
     "matched": {
      "n": 422,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 49,
      "iqr": 3.0,
      "mean": 3.3,
      "sd": 5.4
     },
     "not_matched": {
      "n": 182,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 20,
      "iqr": 2.0,
      "mean": 3.0,
      "sd": 3.9
     }
    },
    "publications": {
     "matched": {
      "n": 422,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 80,
      "iqr": 3.0,
      "mean": 4.4,
      "sd": 7.6
     },
     "not_matched": {
      "n": 182,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 40,
      "iqr": 4.0,
      "mean": 4.2,
      "sd": 5.5
     }
    },
    "work": {
     "matched": {
      "n": 422,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 20,
      "iqr": 3.0,
      "mean": 3.4,
      "sd": 2.8
     },
     "not_matched": {
      "n": 182,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 15,
      "iqr": 3.0,
      "mean": 3.8,
      "sd": 2.4
     }
    },
    "volunteer": {
     "matched": {
      "n": 422,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 40,
      "iqr": 2.0,
      "mean": 3.5,
      "sd": 3.0
     },
     "not_matched": {
      "n": 182,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 10,
      "iqr": 2.0,
      "mean": 3.4,
      "sd": 2.0
     }
    }
   },
   "phd": {
    "matched": 1.9,
    "not_matched": 2.8
   },
   "gradDegree": {
    "matched": 21.3,
    "not_matched": 22.3
   }
  },
  {
   "name": "Public Health and Preventive Medicine",
   "short": "Public Health / Prev Med",
   "positions": 63,
   "allApplicants": 61,
   "imgMatched": 3,
   "imgNotMatched": 2,
   "imgTotal": 5,
   "matchRate": 60.0,
   "allPerPos": 0.97,
   "imgPerPos": 0.08,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "step2ck": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "research": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "abstracts": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "presentations": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "publications": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "work": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "volunteer": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    }
   },
   "phd": {
    "matched": null,
    "not_matched": null
   },
   "gradDegree": {
    "matched": null,
    "not_matched": null
   }
  },
  {
   "name": "Psychiatry",
   "short": "Psychiatry",
   "positions": 2516,
   "allApplicants": 2873,
   "imgMatched": 219,
   "imgNotMatched": 156,
   "imgTotal": 375,
   "matchRate": 58.4,
   "allPerPos": 1.14,
   "imgPerPos": 0.15,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 171,
      "min": 1,
      "q1": 2.0,
      "median": 5.0,
      "q3": 8.0,
      "max": 21,
      "iqr": 6.0,
      "mean": 5.8,
      "sd": 4.2
     },
     "not_matched": {
      "n": 126,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 13,
      "iqr": 2.0,
      "mean": 2.6,
      "sd": 2.2
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 171,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 1.0,
      "max": 4,
      "iqr": 0.0,
      "mean": 1.3,
      "sd": 0.6
     },
     "not_matched": {
      "n": 126,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 4,
      "iqr": 1.0,
      "mean": 1.3,
      "sd": 0.6
     }
    },
    "step2ck": {
     "matched": {
      "n": 171,
      "min": 213,
      "q1": 229.0,
      "median": 241.0,
      "q3": 255.0,
      "max": 274,
      "iqr": 26.0,
      "mean": 242.0,
      "sd": 16.0
     },
     "not_matched": {
      "n": 126,
      "min": 214,
      "q1": 226.0,
      "median": 237.0,
      "q3": 247.0,
      "max": 276,
      "iqr": 21.0,
      "mean": 237.0,
      "sd": 13.0
     }
    },
    "research": {
     "matched": {
      "n": 171,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 21,
      "iqr": 4.0,
      "mean": 3.9,
      "sd": 3.8
     },
     "not_matched": {
      "n": 126,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 50,
      "iqr": 3.0,
      "mean": 4.0,
      "sd": 6.8
     }
    },
    "abstracts": {
     "matched": {
      "n": 171,
      "min": 0,
      "q1": 0.0,
      "median": 1.0,
      "q3": 4.0,
      "max": 15,
      "iqr": 4.0,
      "mean": 2.9,
      "sd": 3.5
     },
     "not_matched": {
      "n": 126,
      "min": 0,
      "q1": 0.0,
      "median": 1.0,
      "q3": 3.0,
      "max": 12,
      "iqr": 3.0,
      "mean": 2.1,
      "sd": 2.8
     }
    },
    "presentations": {
     "matched": {
      "n": 171,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 55,
      "iqr": 4.0,
      "mean": 4.5,
      "sd": 6.5
     },
     "not_matched": {
      "n": 126,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 27,
      "iqr": 3.0,
      "mean": 3.0,
      "sd": 4.4
     }
    },
    "publications": {
     "matched": {
      "n": 171,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 75,
      "iqr": 4.0,
      "mean": 4.9,
      "sd": 8.8
     },
     "not_matched": {
      "n": 126,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 45,
      "iqr": 4.0,
      "mean": 4.5,
      "sd": 7.2
     }
    },
    "work": {
     "matched": {
      "n": 171,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 13,
      "iqr": 3.0,
      "mean": 3.8,
      "sd": 2.8
     },
     "not_matched": {
      "n": 126,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 14,
      "iqr": 4.0,
      "mean": 4.2,
      "sd": 3.2
     }
    },
    "volunteer": {
     "matched": {
      "n": 171,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 18,
      "iqr": 2.0,
      "mean": 3.6,
      "sd": 2.6
     },
     "not_matched": {
      "n": 126,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 18,
      "iqr": 2.0,
      "mean": 3.4,
      "sd": 2.7
     }
    }
   },
   "phd": {
    "matched": 3.3,
    "not_matched": 1.9
   },
   "gradDegree": {
    "matched": 25.5,
    "not_matched": 31.5
   }
  },
  {
   "name": "Radiology-Diagnostic",
   "short": "Radiology (Diagnostic)",
   "positions": 1268,
   "allApplicants": 1419,
   "imgMatched": 102,
   "imgNotMatched": 73,
   "imgTotal": 175,
   "matchRate": 58.3,
   "allPerPos": 1.12,
   "imgPerPos": 0.14,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 75,
      "min": 1,
      "q1": 2.0,
      "median": 5.0,
      "q3": 8.0,
      "max": 14,
      "iqr": 6.0,
      "mean": 5.3,
      "sd": 3.4
     },
     "not_matched": {
      "n": 52,
      "min": 1,
      "q1": 1.0,
      "median": 1.5,
      "q3": 2.0,
      "max": 7,
      "iqr": 1.0,
      "mean": 2.2,
      "sd": 1.7
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 75,
      "min": 1,
      "q1": 2.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 6,
      "iqr": 1.0,
      "mean": 2.5,
      "sd": 1.2
     },
     "not_matched": {
      "n": 52,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 6,
      "iqr": 2.0,
      "mean": 2.3,
      "sd": 1.2
     }
    },
    "step2ck": {
     "matched": {
      "n": 75,
      "min": 215,
      "q1": 243.0,
      "median": 250.0,
      "q3": 262.0,
      "max": 276,
      "iqr": 19.0,
      "mean": 251.0,
      "sd": 14.0
     },
     "not_matched": {
      "n": 52,
      "min": 216,
      "q1": 240.0,
      "median": 251.0,
      "q3": 262.0,
      "max": 280,
      "iqr": 22.0,
      "mean": 250.0,
      "sd": 15.0
     }
    },
    "research": {
     "matched": {
      "n": 75,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 53,
      "iqr": 4.0,
      "mean": 7.0,
      "sd": 11.0
     },
     "not_matched": {
      "n": 52,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 5.0,
      "max": 60,
      "iqr": 3.0,
      "mean": 5.2,
      "sd": 9.1
     }
    },
    "abstracts": {
     "matched": {
      "n": 75,
      "min": 0,
      "q1": 1.0,
      "median": 5.0,
      "q3": 10.0,
      "max": 75,
      "iqr": 9.0,
      "mean": 9.1,
      "sd": 13.9
     },
     "not_matched": {
      "n": 52,
      "min": 0,
      "q1": 0.0,
      "median": 2.0,
      "q3": 6.0,
      "max": 30,
      "iqr": 6.0,
      "mean": 3.7,
      "sd": 5.3
     }
    },
    "presentations": {
     "matched": {
      "n": 75,
      "min": 0,
      "q1": 2.0,
      "median": 4.5,
      "q3": 11.0,
      "max": 33,
      "iqr": 9.0,
      "mean": 7.9,
      "sd": 8.7
     },
     "not_matched": {
      "n": 52,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 30,
      "iqr": 4.0,
      "mean": 3.9,
      "sd": 5.4
     }
    },
    "publications": {
     "matched": {
      "n": 75,
      "min": 0,
      "q1": 2.0,
      "median": 6.0,
      "q3": 13.0,
      "max": 47,
      "iqr": 11.0,
      "mean": 10.1,
      "sd": 10.8
     },
     "not_matched": {
      "n": 52,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 9.0,
      "max": 30,
      "iqr": 7.0,
      "mean": 6.6,
      "sd": 7.1
     }
    },
    "work": {
     "matched": {
      "n": 75,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 10,
      "iqr": 3.0,
      "mean": 3.2,
      "sd": 2.5
     },
     "not_matched": {
      "n": 52,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 11,
      "iqr": 2.0,
      "mean": 3.4,
      "sd": 2.4
     }
    },
    "volunteer": {
     "matched": {
      "n": 75,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 15,
      "iqr": 2.0,
      "mean": 3.0,
      "sd": 2.7
     },
     "not_matched": {
      "n": 52,
      "min": 0,
      "q1": 2.0,
      "median": 2.5,
      "q3": 3.0,
      "max": 12,
      "iqr": 1.0,
      "mean": 2.8,
      "sd": 1.9
     }
    }
   },
   "phd": {
    "matched": 3.1,
    "not_matched": 2.6
   },
   "gradDegree": {
    "matched": 21.9,
    "not_matched": 31.7
   }
  },
  {
   "name": "Emergency Medicine",
   "short": "Emergency Medicine",
   "positions": 3198,
   "allApplicants": 3224,
   "imgMatched": 80,
   "imgNotMatched": 68,
   "imgTotal": 148,
   "matchRate": 54.1,
   "allPerPos": 1.01,
   "imgPerPos": 0.05,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 60,
      "min": 1,
      "q1": 2.0,
      "median": 4.0,
      "q3": 7.0,
      "max": 20,
      "iqr": 5.0,
      "mean": 5.1,
      "sd": 4.3
     },
     "not_matched": {
      "n": 53,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 20,
      "iqr": 1.0,
      "mean": 2.1,
      "sd": 2.7
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 60,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 3,
      "iqr": 1.0,
      "mean": 1.4,
      "sd": 0.6
     },
     "not_matched": {
      "n": 53,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 5,
      "iqr": 1.0,
      "mean": 1.8,
      "sd": 0.9
     }
    },
    "step2ck": {
     "matched": {
      "n": 60,
      "min": 219,
      "q1": 234.0,
      "median": 243.0,
      "q3": 256.0,
      "max": 275,
      "iqr": 22.0,
      "mean": 244.0,
      "sd": 14.0
     },
     "not_matched": {
      "n": 53,
      "min": 211,
      "q1": 230.0,
      "median": 236.0,
      "q3": 244.0,
      "max": 266,
      "iqr": 14.0,
      "mean": 236.0,
      "sd": 13.0
     }
    },
    "research": {
     "matched": {
      "n": 60,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 100,
      "iqr": 4.0,
      "mean": 6.3,
      "sd": 15.1
     },
     "not_matched": {
      "n": 53,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 23,
      "iqr": 3.0,
      "mean": 3.6,
      "sd": 3.8
     }
    },
    "abstracts": {
     "matched": {
      "n": 60,
      "min": 0,
      "q1": 0.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 50,
      "iqr": 2.0,
      "mean": 3.4,
      "sd": 8.4
     },
     "not_matched": {
      "n": 53,
      "min": 0,
      "q1": 0.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 13,
      "iqr": 5.0,
      "mean": 3.0,
      "sd": 3.2
     }
    },
    "presentations": {
     "matched": {
      "n": 60,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 50,
      "iqr": 5.0,
      "mean": 5.0,
      "sd": 7.7
     },
     "not_matched": {
      "n": 53,
      "min": 0,
      "q1": 1.0,
      "median": 2.5,
      "q3": 5.0,
      "max": 30,
      "iqr": 4.0,
      "mean": 4.5,
      "sd": 6.0
     }
    },
    "publications": {
     "matched": {
      "n": 60,
      "min": 0,
      "q1": 0.0,
      "median": 2.0,
      "q3": 6.0,
      "max": 65,
      "iqr": 6.0,
      "mean": 4.4,
      "sd": 9.7
     },
     "not_matched": {
      "n": 53,
      "min": 0,
      "q1": 0.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 28,
      "iqr": 5.0,
      "mean": 4.2,
      "sd": 6.3
     }
    },
    "work": {
     "matched": {
      "n": 60,
      "min": 0,
      "q1": 1.0,
      "median": 4.0,
      "q3": 5.0,
      "max": 12,
      "iqr": 4.0,
      "mean": 3.9,
      "sd": 2.9
     },
     "not_matched": {
      "n": 53,
      "min": 0,
      "q1": 3.0,
      "median": 4.0,
      "q3": 6.0,
      "max": 20,
      "iqr": 3.0,
      "mean": 5.6,
      "sd": 4.3
     }
    },
    "volunteer": {
     "matched": {
      "n": 60,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 6.0,
      "max": 21,
      "iqr": 4.0,
      "mean": 4.8,
      "sd": 3.7
     },
     "not_matched": {
      "n": 53,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 150,
      "iqr": 2.0,
      "mean": 8.6,
      "sd": 25.2
     }
    }
   },
   "phd": {
    "matched": 1.9,
    "not_matched": 0.0
   },
   "gradDegree": {
    "matched": 17.0,
    "not_matched": 36.2
   }
  },
  {
   "name": "Family Medicine",
   "short": "Family Medicine",
   "positions": 5491,
   "allApplicants": 4685,
   "imgMatched": 599,
   "imgNotMatched": 513,
   "imgTotal": 1112,
   "matchRate": 53.9,
   "allPerPos": 0.85,
   "imgPerPos": 0.2,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 446,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 7.0,
      "max": 35,
      "iqr": 5.0,
      "mean": 5.4,
      "sd": 5.5
     },
     "not_matched": {
      "n": 387,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 20,
      "iqr": 1.0,
      "mean": 1.9,
      "sd": 2.1
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 446,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 5,
      "iqr": 1.0,
      "mean": 1.4,
      "sd": 0.6
     },
     "not_matched": {
      "n": 387,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 6,
      "iqr": 1.0,
      "mean": 1.4,
      "sd": 0.6
     }
    },
    "step2ck": {
     "matched": {
      "n": 446,
      "min": 209,
      "q1": 222.0,
      "median": 230.0,
      "q3": 239.0,
      "max": 267,
      "iqr": 17.0,
      "mean": 231.0,
      "sd": 12.0
     },
     "not_matched": {
      "n": 387,
      "min": 210,
      "q1": 223.0,
      "median": 231.0,
      "q3": 241.0,
      "max": 276,
      "iqr": 18.0,
      "mean": 232.0,
      "sd": 13.0
     }
    },
    "research": {
     "matched": {
      "n": 446,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 37,
      "iqr": 4.0,
      "mean": 3.7,
      "sd": 4.4
     },
     "not_matched": {
      "n": 387,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 22,
      "iqr": 3.0,
      "mean": 3.3,
      "sd": 3.6
     }
    },
    "abstracts": {
     "matched": {
      "n": 446,
      "min": 0,
      "q1": 0.0,
      "median": 1.0,
      "q3": 4.0,
      "max": 30,
      "iqr": 4.0,
      "mean": 2.7,
      "sd": 4.2
     },
     "not_matched": {
      "n": 387,
      "min": 0,
      "q1": 0.0,
      "median": 1.0,
      "q3": 3.0,
      "max": 23,
      "iqr": 3.0,
      "mean": 2.5,
      "sd": 3.8
     }
    },
    "presentations": {
     "matched": {
      "n": 446,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 21,
      "iqr": 2.0,
      "mean": 2.8,
      "sd": 3.4
     },
     "not_matched": {
      "n": 387,
      "min": 0,
      "q1": 1.0,
      "median": 1.0,
      "q3": 3.0,
      "max": 33,
      "iqr": 2.0,
      "mean": 2.8,
      "sd": 4.6
     }
    },
    "publications": {
     "matched": {
      "n": 446,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 23,
      "iqr": 3.0,
      "mean": 3.1,
      "sd": 3.7
     },
     "not_matched": {
      "n": 387,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 80,
      "iqr": 3.0,
      "mean": 4.0,
      "sd": 7.9
     }
    },
    "work": {
     "matched": {
      "n": 446,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 20,
      "iqr": 4.0,
      "mean": 4.3,
      "sd": 3.2
     },
     "not_matched": {
      "n": 387,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 20,
      "iqr": 3.0,
      "mean": 4.2,
      "sd": 3.2
     }
    },
    "volunteer": {
     "matched": {
      "n": 446,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 57,
      "iqr": 2.0,
      "mean": 3.8,
      "sd": 4.1
     },
     "not_matched": {
      "n": 387,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 60,
      "iqr": 2.0,
      "mean": 3.7,
      "sd": 5.6
     }
    }
   },
   "phd": {
    "matched": 1.0,
    "not_matched": 1.6
   },
   "gradDegree": {
    "matched": 23.1,
    "not_matched": 27.3
   }
  },
  {
   "name": "Physical Medicine and Rehabilitation",
   "short": "PM&R",
   "positions": 601,
   "allApplicants": 828,
   "imgMatched": 21,
   "imgNotMatched": 18,
   "imgTotal": 39,
   "matchRate": 53.8,
   "allPerPos": 1.38,
   "imgPerPos": 0.06,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 15,
      "min": 1,
      "q1": 3.0,
      "median": 5.0,
      "q3": 10.0,
      "max": 14,
      "iqr": 7.0,
      "mean": 6.3,
      "sd": 4.2
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 1.0,
      "median": 1.5,
      "q3": 4.0,
      "max": 8,
      "iqr": 3.0,
      "mean": 2.7,
      "sd": 2.3
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 15,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 3,
      "iqr": 1.0,
      "mean": 1.8,
      "sd": 0.8
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 3.0,
      "max": 4,
      "iqr": 1.0,
      "mean": 2.4,
      "sd": 0.9
     }
    },
    "step2ck": {
     "matched": {
      "n": 15,
      "min": 219,
      "q1": 230.0,
      "median": 240.0,
      "q3": 249.0,
      "max": 259,
      "iqr": 19.0,
      "mean": 239.0,
      "sd": 13.0
     },
     "not_matched": {
      "n": 14,
      "min": 214,
      "q1": 222.0,
      "median": 240.0,
      "q3": 250.0,
      "max": 276,
      "iqr": 28.0,
      "mean": 237.0,
      "sd": 18.0
     }
    },
    "research": {
     "matched": {
      "n": 15,
      "min": 1,
      "q1": 3.0,
      "median": 7.0,
      "q3": 11.0,
      "max": 15,
      "iqr": 8.0,
      "mean": 7.6,
      "sd": 4.6
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 11,
      "iqr": 3.0,
      "mean": 3.8,
      "sd": 2.9
     }
    },
    "abstracts": {
     "matched": {
      "n": 15,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 9,
      "iqr": 2.0,
      "mean": 3.3,
      "sd": 2.4
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 2.0,
      "median": 2.5,
      "q3": 3.0,
      "max": 12,
      "iqr": 1.0,
      "mean": 3.9,
      "sd": 3.6
     }
    },
    "presentations": {
     "matched": {
      "n": 15,
      "min": 1,
      "q1": 3.0,
      "median": 7.0,
      "q3": 10.0,
      "max": 15,
      "iqr": 7.0,
      "mean": 6.5,
      "sd": 4.5
     },
     "not_matched": {
      "n": 14,
      "min": 0,
      "q1": 1.0,
      "median": 4.0,
      "q3": 8.0,
      "max": 11,
      "iqr": 7.0,
      "mean": 4.6,
      "sd": 4.1
     }
    },
    "publications": {
     "matched": {
      "n": 15,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 18,
      "iqr": 4.0,
      "mean": 4.2,
      "sd": 4.8
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 1.0,
      "median": 4.0,
      "q3": 8.0,
      "max": 16,
      "iqr": 7.0,
      "mean": 5.4,
      "sd": 5.1
     }
    },
    "work": {
     "matched": {
      "n": 15,
      "min": 1,
      "q1": 2.0,
      "median": 3.5,
      "q3": 4.0,
      "max": 11,
      "iqr": 2.0,
      "mean": 3.8,
      "sd": 2.7
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 2.0,
      "median": 2.0,
      "q3": 6.0,
      "max": 9,
      "iqr": 4.0,
      "mean": 3.5,
      "sd": 2.7
     }
    },
    "volunteer": {
     "matched": {
      "n": 15,
      "min": 1,
      "q1": 1.0,
      "median": 3.0,
      "q3": 7.0,
      "max": 20,
      "iqr": 6.0,
      "mean": 5.5,
      "sd": 5.7
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 8,
      "iqr": 3.0,
      "mean": 3.7,
      "sd": 2.5
     }
    }
   },
   "phd": {
    "matched": 7.1,
    "not_matched": 15.4
   },
   "gradDegree": {
    "matched": 14.3,
    "not_matched": 18.2
   }
  },
  {
   "name": "Child Neurology",
   "short": "Child Neurology",
   "positions": 243,
   "allApplicants": 249,
   "imgMatched": 26,
   "imgNotMatched": 24,
   "imgTotal": 50,
   "matchRate": 52.0,
   "allPerPos": 1.02,
   "imgPerPos": 0.21,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 18,
      "min": 1,
      "q1": 2.0,
      "median": 4.0,
      "q3": 7.0,
      "max": 14,
      "iqr": 5.0,
      "mean": 5.4,
      "sd": 4.6
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 7,
      "iqr": 1.0,
      "mean": 2.0,
      "sd": 1.7
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 18,
      "min": 1,
      "q1": 2.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 4,
      "iqr": 1.0,
      "mean": 2.4,
      "sd": 1.0
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 2.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 5,
      "iqr": 1.0,
      "mean": 2.4,
      "sd": 0.9
     }
    },
    "step2ck": {
     "matched": {
      "n": 18,
      "min": 215,
      "q1": 234.0,
      "median": 238.0,
      "q3": 250.0,
      "max": 272,
      "iqr": 16.0,
      "mean": 241.0,
      "sd": 15.0
     },
     "not_matched": {
      "n": 20,
      "min": 210,
      "q1": 232.0,
      "median": 235.0,
      "q3": 245.0,
      "max": 271,
      "iqr": 13.0,
      "mean": 237.0,
      "sd": 14.0
     }
    },
    "research": {
     "matched": {
      "n": 18,
      "min": 1,
      "q1": 3.0,
      "median": 5.0,
      "q3": 7.0,
      "max": 10,
      "iqr": 4.0,
      "mean": 4.9,
      "sd": 2.4
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 3.0,
      "median": 3.5,
      "q3": 10.0,
      "max": 30,
      "iqr": 7.0,
      "mean": 7.3,
      "sd": 7.4
     }
    },
    "abstracts": {
     "matched": {
      "n": 18,
      "min": 0,
      "q1": 0.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 9,
      "iqr": 5.0,
      "mean": 3.0,
      "sd": 2.9
     },
     "not_matched": {
      "n": 20,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 21,
      "iqr": 4.0,
      "mean": 5.2,
      "sd": 5.7
     }
    },
    "presentations": {
     "matched": {
      "n": 18,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 8,
      "iqr": 2.0,
      "mean": 3.2,
      "sd": 2.2
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 15,
      "iqr": 4.0,
      "mean": 4.6,
      "sd": 4.4
     }
    },
    "publications": {
     "matched": {
      "n": 18,
      "min": 1,
      "q1": 2.0,
      "median": 4.0,
      "q3": 5.0,
      "max": 13,
      "iqr": 3.0,
      "mean": 4.6,
      "sd": 3.7
     },
     "not_matched": {
      "n": 20,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 15,
      "iqr": 3.0,
      "mean": 4.8,
      "sd": 4.2
     }
    },
    "work": {
     "matched": {
      "n": 18,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 10,
      "iqr": 3.0,
      "mean": 2.8,
      "sd": 2.5
     },
     "not_matched": {
      "n": 20,
      "min": 0,
      "q1": 2.0,
      "median": 3.5,
      "q3": 9.0,
      "max": 15,
      "iqr": 7.0,
      "mean": 5.3,
      "sd": 4.4
     }
    },
    "volunteer": {
     "matched": {
      "n": 18,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 10,
      "iqr": 4.0,
      "mean": 3.7,
      "sd": 2.8
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 10,
      "iqr": 3.0,
      "mean": 3.6,
      "sd": 2.4
     }
    }
   },
   "phd": {
    "matched": 6.7,
    "not_matched": 5.6
   },
   "gradDegree": {
    "matched": 13.3,
    "not_matched": 38.9
   }
  },
  {
   "name": "Radiation Oncology",
   "short": "Radiation Oncology",
   "positions": 187,
   "allApplicants": 222,
   "imgMatched": 18,
   "imgNotMatched": 17,
   "imgTotal": 35,
   "matchRate": 51.4,
   "allPerPos": 1.19,
   "imgPerPos": 0.19,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 12,
      "min": 1,
      "q1": 5.0,
      "median": 11.0,
      "q3": 15.0,
      "max": 18,
      "iqr": 10.0,
      "mean": 10.7,
      "sd": 5.8
     },
     "not_matched": {
      "n": 13,
      "min": 1,
      "q1": 2.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 8,
      "iqr": 0.0,
      "mean": 2.4,
      "sd": 1.8
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 12,
      "min": 1,
      "q1": 1.0,
      "median": 3.0,
      "q3": 3.0,
      "max": 4,
      "iqr": 2.0,
      "mean": 2.5,
      "sd": 1.1
     },
     "not_matched": {
      "n": 13,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 5,
      "iqr": 1.0,
      "mean": 2.0,
      "sd": 1.3
     }
    },
    "step2ck": {
     "matched": {
      "n": 12,
      "min": 228,
      "q1": 240.0,
      "median": 249.0,
      "q3": 254.0,
      "max": 270,
      "iqr": 14.0,
      "mean": 248.0,
      "sd": 14.0
     },
     "not_matched": {
      "n": 13,
      "min": 222,
      "q1": 233.0,
      "median": 244.0,
      "q3": 249.0,
      "max": 271,
      "iqr": 16.0,
      "mean": 242.0,
      "sd": 13.0
     }
    },
    "research": {
     "matched": {
      "n": 12,
      "min": 1,
      "q1": 3.0,
      "median": 5.0,
      "q3": 20.0,
      "max": 55,
      "iqr": 17.0,
      "mean": 12.2,
      "sd": 16.0
     },
     "not_matched": {
      "n": 13,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 8.0,
      "max": 73,
      "iqr": 6.0,
      "mean": 10.1,
      "sd": 20.1
     }
    },
    "abstracts": {
     "matched": {
      "n": 12,
      "min": 2,
      "q1": 2.0,
      "median": 7.0,
      "q3": 12.0,
      "max": 16,
      "iqr": 10.0,
      "mean": 7.1,
      "sd": 5.2
     },
     "not_matched": {
      "n": 13,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 20,
      "iqr": 4.0,
      "mean": 4.3,
      "sd": 5.7
     }
    },
    "presentations": {
     "matched": {
      "n": 12,
      "min": 1,
      "q1": 2.0,
      "median": 8.0,
      "q3": 9.0,
      "max": 16,
      "iqr": 7.0,
      "mean": 7.2,
      "sd": 5.4
     },
     "not_matched": {
      "n": 13,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 7.0,
      "max": 15,
      "iqr": 6.0,
      "mean": 4.2,
      "sd": 4.5
     }
    },
    "publications": {
     "matched": {
      "n": 12,
      "min": 1,
      "q1": 4.0,
      "median": 19.0,
      "q3": 40.0,
      "max": 63,
      "iqr": 36.0,
      "mean": 22.1,
      "sd": 21.0
     },
     "not_matched": {
      "n": 13,
      "min": 2,
      "q1": 2.0,
      "median": 3.0,
      "q3": 8.0,
      "max": 46,
      "iqr": 6.0,
      "mean": 9.2,
      "sd": 13.4
     }
    },
    "work": {
     "matched": {
      "n": 12,
      "min": 1,
      "q1": 1.0,
      "median": 3.5,
      "q3": 8.0,
      "max": 10,
      "iqr": 7.0,
      "mean": 4.2,
      "sd": 3.5
     },
     "not_matched": {
      "n": 13,
      "min": 1,
      "q1": 1.0,
      "median": 2.5,
      "q3": 7.0,
      "max": 10,
      "iqr": 6.0,
      "mean": 4.3,
      "sd": 3.5
     }
    },
    "volunteer": {
     "matched": {
      "n": 12,
      "min": 1,
      "q1": 2.0,
      "median": 4.0,
      "q3": 6.0,
      "max": 8,
      "iqr": 4.0,
      "mean": 4.1,
      "sd": 2.5
     },
     "not_matched": {
      "n": 13,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 9,
      "iqr": 3.0,
      "mean": 3.8,
      "sd": 2.3
     }
    }
   },
   "phd": {
    "matched": 10.0,
    "not_matched": 0.0
   },
   "gradDegree": {
    "matched": 20.0,
    "not_matched": 41.7
   }
  },
  {
   "name": "Internal Medicine",
   "short": "Internal Medicine",
   "positions": 11632,
   "allApplicants": 14734,
   "imgMatched": 3392,
   "imgNotMatched": 3600,
   "imgTotal": 6992,
   "matchRate": 48.5,
   "allPerPos": 1.27,
   "imgPerPos": 0.6,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 2649,
      "min": 1,
      "q1": 3.0,
      "median": 5.0,
      "q3": 8.0,
      "max": 44,
      "iqr": 5.0,
      "mean": 6.1,
      "sd": 4.5
     },
     "not_matched": {
      "n": 2730,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 20,
      "iqr": 2.0,
      "mean": 2.5,
      "sd": 2.2
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 2649,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 1.0,
      "max": 5,
      "iqr": 0.0,
      "mean": 1.3,
      "sd": 0.6
     },
     "not_matched": {
      "n": 2730,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 6,
      "iqr": 1.0,
      "mean": 1.4,
      "sd": 0.7
     }
    },
    "step2ck": {
     "matched": {
      "n": 2649,
      "min": 209,
      "q1": 240.0,
      "median": 251.0,
      "q3": 259.0,
      "max": 284,
      "iqr": 19.0,
      "mean": 249.0,
      "sd": 14.0
     },
     "not_matched": {
      "n": 2730,
      "min": 209,
      "q1": 233.0,
      "median": 243.0,
      "q3": 253.0,
      "max": 279,
      "iqr": 20.0,
      "mean": 242.0,
      "sd": 14.0
     }
    },
    "research": {
     "matched": {
      "n": 2649,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 150,
      "iqr": 3.0,
      "mean": 4.8,
      "sd": 6.8
     },
     "not_matched": {
      "n": 2730,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 149,
      "iqr": 4.0,
      "mean": 4.2,
      "sd": 6.4
     }
    },
    "abstracts": {
     "matched": {
      "n": 2649,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 100,
      "iqr": 4.0,
      "mean": 3.8,
      "sd": 6.1
     },
     "not_matched": {
      "n": 2730,
      "min": 0,
      "q1": 0.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 70,
      "iqr": 4.0,
      "mean": 3.0,
      "sd": 4.8
     }
    },
    "presentations": {
     "matched": {
      "n": 2649,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 58,
      "iqr": 3.0,
      "mean": 3.2,
      "sd": 4.4
     },
     "not_matched": {
      "n": 2730,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 50,
      "iqr": 2.0,
      "mean": 2.6,
      "sd": 3.6
     }
    },
    "publications": {
     "matched": {
      "n": 2649,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 351,
      "iqr": 5.0,
      "mean": 5.3,
      "sd": 11.1
     },
     "not_matched": {
      "n": 2730,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 92,
      "iqr": 4.0,
      "mean": 4.3,
      "sd": 6.6
     }
    },
    "work": {
     "matched": {
      "n": 2649,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 23,
      "iqr": 3.0,
      "mean": 3.3,
      "sd": 2.8
     },
     "not_matched": {
      "n": 2730,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 33,
      "iqr": 3.0,
      "mean": 3.9,
      "sd": 3.0
     }
    },
    "volunteer": {
     "matched": {
      "n": 2649,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 50,
      "iqr": 2.0,
      "mean": 3.4,
      "sd": 3.1
     },
     "not_matched": {
      "n": 2730,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 350,
      "iqr": 2.0,
      "mean": 3.6,
      "sd": 8.7
     }
    }
   },
   "phd": {
    "matched": 1.3,
    "not_matched": 1.0
   },
   "gradDegree": {
    "matched": 19.4,
    "not_matched": 21.3
   }
  },
  {
   "name": "Interventional Radiology (Integrated)",
   "short": "Interventional Radiology",
   "positions": 245,
   "allApplicants": 276,
   "imgMatched": 14,
   "imgNotMatched": 15,
   "imgTotal": 29,
   "matchRate": 48.3,
   "allPerPos": 1.13,
   "imgPerPos": 0.12,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 11,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 6,
      "iqr": 3.0,
      "mean": 2.5,
      "sd": 1.8
     },
     "not_matched": {
      "n": 10,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 2,
      "iqr": 1.0,
      "mean": 1.3,
      "sd": 0.5
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 11,
      "min": 2,
      "q1": 2.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 4,
      "iqr": 2.0,
      "mean": 2.7,
      "sd": 0.9
     },
     "not_matched": {
      "n": 10,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 4,
      "iqr": 2.0,
      "mean": 2.8,
      "sd": 1.0
     }
    },
    "step2ck": {
     "matched": {
      "n": 11,
      "min": 246,
      "q1": 253.0,
      "median": 260.0,
      "q3": 266.0,
      "max": 273,
      "iqr": 13.0,
      "mean": 260.0,
      "sd": 9.0
     },
     "not_matched": {
      "n": 10,
      "min": 227,
      "q1": 249.0,
      "median": 250.0,
      "q3": 257.0,
      "max": 275,
      "iqr": 8.0,
      "mean": 252.0,
      "sd": 13.0
     }
    },
    "research": {
     "matched": {
      "n": 11,
      "min": 1,
      "q1": 2.0,
      "median": 4.0,
      "q3": 7.0,
      "max": 10,
      "iqr": 5.0,
      "mean": 5.0,
      "sd": 3.1
     },
     "not_matched": {
      "n": 10,
      "min": 0,
      "q1": 2.0,
      "median": 3.5,
      "q3": 4.0,
      "max": 50,
      "iqr": 2.0,
      "mean": 8.8,
      "sd": 16.7
     }
    },
    "abstracts": {
     "matched": {
      "n": 11,
      "min": 1,
      "q1": 1.0,
      "median": 3.5,
      "q3": 9.0,
      "max": 16,
      "iqr": 8.0,
      "mean": 5.7,
      "sd": 5.9
     },
     "not_matched": {
      "n": 10,
      "min": 0,
      "q1": 1.0,
      "median": 2.5,
      "q3": 8.0,
      "max": 34,
      "iqr": 7.0,
      "mean": 8.1,
      "sd": 11.7
     }
    },
    "presentations": {
     "matched": {
      "n": 11,
      "min": 1,
      "q1": 1.0,
      "median": 6.0,
      "q3": 6.0,
      "max": 12,
      "iqr": 5.0,
      "mean": 5.3,
      "sd": 4.1
     },
     "not_matched": {
      "n": 10,
      "min": 0,
      "q1": 1.0,
      "median": 1.0,
      "q3": 5.0,
      "max": 23,
      "iqr": 4.0,
      "mean": 5.1,
      "sd": 7.8
     }
    },
    "publications": {
     "matched": {
      "n": 11,
      "min": 1,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 9,
      "iqr": 4.0,
      "mean": 3.8,
      "sd": 2.8
     },
     "not_matched": {
      "n": 10,
      "min": 0,
      "q1": 1.0,
      "median": 6.0,
      "q3": 20.0,
      "max": 23,
      "iqr": 19.0,
      "mean": 9.7,
      "sd": 9.7
     }
    },
    "work": {
     "matched": {
      "n": 11,
      "min": 1,
      "q1": 2.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 3,
      "iqr": 1.0,
      "mean": 2.2,
      "sd": 0.8
     },
     "not_matched": {
      "n": 10,
      "min": 1,
      "q1": 2.0,
      "median": 4.5,
      "q3": 5.0,
      "max": 8,
      "iqr": 3.0,
      "mean": 4.5,
      "sd": 2.3
     }
    },
    "volunteer": {
     "matched": {
      "n": 11,
      "min": 1,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 7,
      "iqr": 4.0,
      "mean": 3.4,
      "sd": 2.1
     },
     "not_matched": {
      "n": 10,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 3,
      "iqr": 1.0,
      "mean": 1.8,
      "sd": 1.0
     }
    }
   },
   "phd": {
    "matched": 0.0,
    "not_matched": 0.0
   },
   "gradDegree": {
    "matched": 12.5,
    "not_matched": 50.0
   }
  },
  {
   "name": "Pathology-Anatomic and Clinical",
   "short": "Pathology",
   "positions": 636,
   "allApplicants": 957,
   "imgMatched": 169,
   "imgNotMatched": 206,
   "imgTotal": 375,
   "matchRate": 45.1,
   "allPerPos": 1.5,
   "imgPerPos": 0.59,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 128,
      "min": 1,
      "q1": 4.0,
      "median": 7.0,
      "q3": 11.0,
      "max": 29,
      "iqr": 7.0,
      "mean": 8.2,
      "sd": 5.7
     },
     "not_matched": {
      "n": 156,
      "min": 1,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 13,
      "iqr": 4.0,
      "mean": 3.6,
      "sd": 2.7
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 128,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 1.0,
      "max": 5,
      "iqr": 0.0,
      "mean": 1.1,
      "sd": 0.5
     },
     "not_matched": {
      "n": 156,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 1.0,
      "max": 3,
      "iqr": 0.0,
      "mean": 1.1,
      "sd": 0.3
     }
    },
    "step2ck": {
     "matched": {
      "n": 128,
      "min": 217,
      "q1": 232.0,
      "median": 244.0,
      "q3": 253.0,
      "max": 274,
      "iqr": 21.0,
      "mean": 243.0,
      "sd": 13.0
     },
     "not_matched": {
      "n": 156,
      "min": 214,
      "q1": 228.0,
      "median": 235.0,
      "q3": 245.0,
      "max": 267,
      "iqr": 17.0,
      "mean": 236.0,
      "sd": 12.0
     }
    },
    "research": {
     "matched": {
      "n": 128,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 16,
      "iqr": 3.0,
      "mean": 4.0,
      "sd": 3.3
     },
     "not_matched": {
      "n": 156,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 30,
      "iqr": 3.0,
      "mean": 4.3,
      "sd": 4.6
     }
    },
    "abstracts": {
     "matched": {
      "n": 128,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 8.0,
      "max": 48,
      "iqr": 7.0,
      "mean": 5.5,
      "sd": 7.0
     },
     "not_matched": {
      "n": 156,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 60,
      "iqr": 4.0,
      "mean": 5.0,
      "sd": 9.8
     }
    },
    "presentations": {
     "matched": {
      "n": 128,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 7.0,
      "max": 59,
      "iqr": 5.0,
      "mean": 5.5,
      "sd": 7.3
     },
     "not_matched": {
      "n": 156,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 32,
      "iqr": 4.0,
      "mean": 5.4,
      "sd": 7.3
     }
    },
    "publications": {
     "matched": {
      "n": 128,
      "min": 0,
      "q1": 3.0,
      "median": 7.0,
      "q3": 13.0,
      "max": 48,
      "iqr": 10.0,
      "mean": 10.3,
      "sd": 10.8
     },
     "not_matched": {
      "n": 156,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 10.0,
      "max": 70,
      "iqr": 8.0,
      "mean": 7.7,
      "sd": 10.7
     }
    },
    "work": {
     "matched": {
      "n": 128,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 21,
      "iqr": 3.0,
      "mean": 4.0,
      "sd": 3.1
     },
     "not_matched": {
      "n": 156,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 5.0,
      "max": 19,
      "iqr": 3.0,
      "mean": 4.3,
      "sd": 3.1
     }
    },
    "volunteer": {
     "matched": {
      "n": 128,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 10,
      "iqr": 2.0,
      "mean": 2.7,
      "sd": 2.1
     },
     "not_matched": {
      "n": 156,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 50,
      "iqr": 2.0,
      "mean": 3.2,
      "sd": 4.9
     }
    }
   },
   "phd": {
    "matched": 16.8,
    "not_matched": 14.8
   },
   "gradDegree": {
    "matched": 46.7,
    "not_matched": 41.2
   }
  },
  {
   "name": "Neurology",
   "short": "Neurology",
   "positions": 1260,
   "allApplicants": 1689,
   "imgMatched": 215,
   "imgNotMatched": 298,
   "imgTotal": 513,
   "matchRate": 41.9,
   "allPerPos": 1.34,
   "imgPerPos": 0.41,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 166,
      "min": 1,
      "q1": 3.0,
      "median": 6.0,
      "q3": 10.0,
      "max": 25,
      "iqr": 7.0,
      "mean": 6.8,
      "sd": 4.8
     },
     "not_matched": {
      "n": 231,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 18,
      "iqr": 3.0,
      "mean": 3.0,
      "sd": 2.8
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 166,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 4,
      "iqr": 1.0,
      "mean": 1.5,
      "sd": 0.7
     },
     "not_matched": {
      "n": 231,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 6,
      "iqr": 1.0,
      "mean": 1.8,
      "sd": 0.9
     }
    },
    "step2ck": {
     "matched": {
      "n": 166,
      "min": 212,
      "q1": 240.0,
      "median": 252.0,
      "q3": 262.0,
      "max": 276,
      "iqr": 22.0,
      "mean": 250.0,
      "sd": 14.0
     },
     "not_matched": {
      "n": 231,
      "min": 215,
      "q1": 233.0,
      "median": 244.0,
      "q3": 254.0,
      "max": 274,
      "iqr": 21.0,
      "mean": 243.0,
      "sd": 14.0
     }
    },
    "research": {
     "matched": {
      "n": 166,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 21,
      "iqr": 4.0,
      "mean": 5.1,
      "sd": 4.7
     },
     "not_matched": {
      "n": 231,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 50,
      "iqr": 4.0,
      "mean": 5.1,
      "sd": 6.0
     }
    },
    "abstracts": {
     "matched": {
      "n": 166,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 25,
      "iqr": 5.0,
      "mean": 4.4,
      "sd": 4.8
     },
     "not_matched": {
      "n": 231,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 150,
      "iqr": 4.0,
      "mean": 4.5,
      "sd": 12.5
     }
    },
    "presentations": {
     "matched": {
      "n": 166,
      "min": 0,
      "q1": 1.0,
      "median": 4.0,
      "q3": 7.0,
      "max": 30,
      "iqr": 6.0,
      "mean": 5.1,
      "sd": 5.3
     },
     "not_matched": {
      "n": 231,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 26,
      "iqr": 4.0,
      "mean": 3.7,
      "sd": 4.5
     }
    },
    "publications": {
     "matched": {
      "n": 166,
      "min": 0,
      "q1": 2.0,
      "median": 5.0,
      "q3": 9.0,
      "max": 44,
      "iqr": 7.0,
      "mean": 7.3,
      "sd": 7.9
     },
     "not_matched": {
      "n": 231,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 7.0,
      "max": 120,
      "iqr": 6.0,
      "mean": 6.0,
      "sd": 12.2
     }
    },
    "work": {
     "matched": {
      "n": 166,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 10,
      "iqr": 3.0,
      "mean": 3.2,
      "sd": 2.3
     },
     "not_matched": {
      "n": 231,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 25,
      "iqr": 3.0,
      "mean": 3.8,
      "sd": 3.2
     }
    },
    "volunteer": {
     "matched": {
      "n": 166,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 28,
      "iqr": 2.0,
      "mean": 3.2,
      "sd": 3.2
     },
     "not_matched": {
      "n": 231,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 20,
      "iqr": 2.0,
      "mean": 3.0,
      "sd": 2.5
     }
    }
   },
   "phd": {
    "matched": 3.6,
    "not_matched": 2.6
   },
   "gradDegree": {
    "matched": 18.7,
    "not_matched": 23.7
   }
  },
  {
   "name": "Otolaryngology",
   "short": "Otolaryngology",
   "positions": 403,
   "allApplicants": 580,
   "imgMatched": 7,
   "imgNotMatched": 10,
   "imgTotal": 17,
   "matchRate": 41.2,
   "allPerPos": 1.44,
   "imgPerPos": 0.04,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 8,
      "min": 1,
      "q1": 1.0,
      "median": 1.5,
      "q3": 3.0,
      "max": 3,
      "iqr": 2.0,
      "mean": 1.9,
      "sd": 1.0
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 8,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 2,
      "iqr": 1.0,
      "mean": 1.6,
      "sd": 0.5
     }
    },
    "step2ck": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 8,
      "min": 230,
      "q1": 233.0,
      "median": 249.0,
      "q3": 253.0,
      "max": 260,
      "iqr": 20.0,
      "mean": 246.0,
      "sd": 11.0
     }
    },
    "research": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 8,
      "min": 2,
      "q1": 3.0,
      "median": 7.0,
      "q3": 14.0,
      "max": 80,
      "iqr": 11.0,
      "mean": 18.8,
      "sd": 30.4
     }
    },
    "abstracts": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 8,
      "min": 2,
      "q1": 5.0,
      "median": 10.0,
      "q3": 17.0,
      "max": 50,
      "iqr": 12.0,
      "mean": 15.7,
      "sd": 17.6
     }
    },
    "presentations": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 8,
      "min": 5,
      "q1": 6.0,
      "median": 6.0,
      "q3": 15.0,
      "max": 59,
      "iqr": 9.0,
      "mean": 16.2,
      "sd": 21.3
     }
    },
    "publications": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 8,
      "min": 2,
      "q1": 2.0,
      "median": 8.5,
      "q3": 17.0,
      "max": 41,
      "iqr": 15.0,
      "mean": 13.2,
      "sd": 14.7
     }
    },
    "work": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 8,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 6,
      "iqr": 3.0,
      "mean": 2.7,
      "sd": 2.0
     }
    },
    "volunteer": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 8,
      "min": 2,
      "q1": 2.0,
      "median": 3.0,
      "q3": 3.0,
      "max": 6,
      "iqr": 1.0,
      "mean": 3.2,
      "sd": 1.5
     }
    }
   },
   "phd": {
    "matched": null,
    "not_matched": 0.0
   },
   "gradDegree": {
    "matched": null,
    "not_matched": 28.6
   }
  },
  {
   "name": "Anesthesiology",
   "short": "Anesthesiology",
   "positions": 2290,
   "allApplicants": 2988,
   "imgMatched": 89,
   "imgNotMatched": 141,
   "imgTotal": 230,
   "matchRate": 38.7,
   "allPerPos": 1.3,
   "imgPerPos": 0.1,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 76,
      "min": 1,
      "q1": 3.0,
      "median": 4.0,
      "q3": 7.0,
      "max": 21,
      "iqr": 4.0,
      "mean": 5.1,
      "sd": 3.6
     },
     "not_matched": {
      "n": 108,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 13,
      "iqr": 2.0,
      "mean": 2.3,
      "sd": 2.1
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 76,
      "min": 1,
      "q1": 1.0,
      "median": 1.5,
      "q3": 2.0,
      "max": 5,
      "iqr": 1.0,
      "mean": 1.9,
      "sd": 1.1
     },
     "not_matched": {
      "n": 108,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 6,
      "iqr": 1.0,
      "mean": 1.9,
      "sd": 1.1
     }
    },
    "step2ck": {
     "matched": {
      "n": 76,
      "min": 212,
      "q1": 243.0,
      "median": 255.0,
      "q3": 262.0,
      "max": 274,
      "iqr": 19.0,
      "mean": 252.0,
      "sd": 14.0
     },
     "not_matched": {
      "n": 108,
      "min": 219,
      "q1": 238.0,
      "median": 247.0,
      "q3": 254.0,
      "max": 280,
      "iqr": 16.0,
      "mean": 246.0,
      "sd": 12.0
     }
    },
    "research": {
     "matched": {
      "n": 76,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 8.0,
      "max": 35,
      "iqr": 6.0,
      "mean": 6.2,
      "sd": 7.8
     },
     "not_matched": {
      "n": 108,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 32,
      "iqr": 4.0,
      "mean": 4.5,
      "sd": 5.3
     }
    },
    "abstracts": {
     "matched": {
      "n": 76,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 33,
      "iqr": 5.0,
      "mean": 5.0,
      "sd": 6.6
     },
     "not_matched": {
      "n": 108,
      "min": 0,
      "q1": 0.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 14,
      "iqr": 5.0,
      "mean": 3.0,
      "sd": 3.5
     }
    },
    "presentations": {
     "matched": {
      "n": 76,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 7.0,
      "max": 24,
      "iqr": 5.0,
      "mean": 5.6,
      "sd": 5.9
     },
     "not_matched": {
      "n": 108,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 15,
      "iqr": 4.0,
      "mean": 3.4,
      "sd": 3.2
     }
    },
    "publications": {
     "matched": {
      "n": 76,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 7.0,
      "max": 69,
      "iqr": 5.0,
      "mean": 7.7,
      "sd": 12.1
     },
     "not_matched": {
      "n": 108,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 40,
      "iqr": 4.0,
      "mean": 4.4,
      "sd": 7.1
     }
    },
    "work": {
     "matched": {
      "n": 76,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 12,
      "iqr": 2.0,
      "mean": 3.6,
      "sd": 2.4
     },
     "not_matched": {
      "n": 108,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 10,
      "iqr": 3.0,
      "mean": 3.6,
      "sd": 2.3
     }
    },
    "volunteer": {
     "matched": {
      "n": 76,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 10,
      "iqr": 3.0,
      "mean": 3.2,
      "sd": 2.3
     },
     "not_matched": {
      "n": 108,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 44,
      "iqr": 2.0,
      "mean": 3.6,
      "sd": 4.9
     }
    }
   },
   "phd": {
    "matched": 7.9,
    "not_matched": 3.3
   },
   "gradDegree": {
    "matched": 33.9,
    "not_matched": 22.9
   }
  },
  {
   "name": "Internal Medicine/Pediatrics",
   "short": "Internal Medicine / Peds",
   "positions": 404,
   "allApplicants": 468,
   "imgMatched": 8,
   "imgNotMatched": 16,
   "imgTotal": 24,
   "matchRate": 33.3,
   "allPerPos": 1.16,
   "imgPerPos": 0.06,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 5,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 1.0,
      "max": 1,
      "iqr": 0.0,
      "mean": 1.0,
      "sd": 0.0
     },
     "not_matched": {
      "n": 15,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 1.0,
      "max": 4,
      "iqr": 0.0,
      "mean": 1.3,
      "sd": 0.8
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 5,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 4,
      "iqr": 1.0,
      "mean": 2.0,
      "sd": 1.2
     },
     "not_matched": {
      "n": 15,
      "min": 2,
      "q1": 2.0,
      "median": 3.0,
      "q3": 3.0,
      "max": 4,
      "iqr": 1.0,
      "mean": 2.7,
      "sd": 0.7
     }
    },
    "step2ck": {
     "matched": {
      "n": 5,
      "min": 220,
      "q1": 230.0,
      "median": 252.0,
      "q3": 252.0,
      "max": 258,
      "iqr": 22.0,
      "mean": 242.0,
      "sd": 16.0
     },
     "not_matched": {
      "n": 15,
      "min": 222,
      "q1": 232.0,
      "median": 245.0,
      "q3": 251.0,
      "max": 270,
      "iqr": 19.0,
      "mean": 244.0,
      "sd": 15.0
     }
    },
    "research": {
     "matched": {
      "n": 5,
      "min": 2,
      "q1": 2.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 10,
      "iqr": 0.0,
      "mean": 4.0,
      "sd": 4.0
     },
     "not_matched": {
      "n": 15,
      "min": 0,
      "q1": 1.0,
      "median": 4.0,
      "q3": 7.0,
      "max": 8,
      "iqr": 6.0,
      "mean": 3.8,
      "sd": 2.8
     }
    },
    "abstracts": {
     "matched": {
      "n": 5,
      "min": 2,
      "q1": 2.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 2,
      "iqr": 0.0,
      "mean": 2.0,
      "sd": 0.0
     },
     "not_matched": {
      "n": 15,
      "min": 0,
      "q1": 0.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 4,
      "iqr": 2.0,
      "mean": 1.5,
      "sd": 1.3
     }
    },
    "presentations": {
     "matched": {
      "n": 5,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 2,
      "iqr": 1.0,
      "mean": 1.3,
      "sd": 0.6
     },
     "not_matched": {
      "n": 15,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 7,
      "iqr": 1.0,
      "mean": 2.0,
      "sd": 1.9
     }
    },
    "publications": {
     "matched": {
      "n": 5,
      "min": 1,
      "q1": 1.0,
      "median": 2.5,
      "q3": 3.0,
      "max": 6,
      "iqr": 2.0,
      "mean": 3.0,
      "sd": 2.2
     },
     "not_matched": {
      "n": 15,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 8,
      "iqr": 3.0,
      "mean": 2.8,
      "sd": 2.5
     }
    },
    "work": {
     "matched": {
      "n": 5,
      "min": 2,
      "q1": 2.0,
      "median": 3.5,
      "q3": 4.0,
      "max": 10,
      "iqr": 2.0,
      "mean": 4.8,
      "sd": 3.6
     },
     "not_matched": {
      "n": 15,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 7.0,
      "max": 14,
      "iqr": 5.0,
      "mean": 4.3,
      "sd": 3.5
     }
    },
    "volunteer": {
     "matched": {
      "n": 5,
      "min": 1,
      "q1": 1.0,
      "median": 1.5,
      "q3": 2.0,
      "max": 3,
      "iqr": 1.0,
      "mean": 1.8,
      "sd": 1.0
     },
     "not_matched": {
      "n": 15,
      "min": 0,
      "q1": 2.0,
      "median": 2.5,
      "q3": 4.0,
      "max": 48,
      "iqr": 2.0,
      "mean": 8.5,
      "sd": 15.2
     }
    }
   },
   "phd": {
    "matched": 0.0,
    "not_matched": 0.0
   },
   "gradDegree": {
    "matched": 25.0,
    "not_matched": 14.3
   }
  },
  {
   "name": "Obstetrics and Gynecology",
   "short": "OB/GYN",
   "positions": 1638,
   "allApplicants": 2140,
   "imgMatched": 44,
   "imgNotMatched": 90,
   "imgTotal": 134,
   "matchRate": 32.8,
   "allPerPos": 1.31,
   "imgPerPos": 0.08,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 38,
      "min": 1,
      "q1": 2.0,
      "median": 3.5,
      "q3": 5.0,
      "max": 11,
      "iqr": 3.0,
      "mean": 4.1,
      "sd": 2.9
     },
     "not_matched": {
      "n": 76,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 7,
      "iqr": 1.0,
      "mean": 1.9,
      "sd": 1.1
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 38,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 4,
      "iqr": 1.0,
      "mean": 1.4,
      "sd": 0.7
     },
     "not_matched": {
      "n": 76,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 4,
      "iqr": 1.0,
      "mean": 1.6,
      "sd": 0.8
     }
    },
    "step2ck": {
     "matched": {
      "n": 38,
      "min": 227,
      "q1": 238.0,
      "median": 242.0,
      "q3": 256.0,
      "max": 274,
      "iqr": 18.0,
      "mean": 245.0,
      "sd": 12.0
     },
     "not_matched": {
      "n": 76,
      "min": 218,
      "q1": 230.0,
      "median": 239.0,
      "q3": 249.0,
      "max": 269,
      "iqr": 19.0,
      "mean": 238.0,
      "sd": 12.0
     }
    },
    "research": {
     "matched": {
      "n": 38,
      "min": 0,
      "q1": 3.0,
      "median": 4.0,
      "q3": 7.0,
      "max": 24,
      "iqr": 4.0,
      "mean": 5.4,
      "sd": 4.6
     },
     "not_matched": {
      "n": 76,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 13,
      "iqr": 2.0,
      "mean": 3.5,
      "sd": 2.6
     }
    },
    "abstracts": {
     "matched": {
      "n": 38,
      "min": 0,
      "q1": 0.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 18,
      "iqr": 4.0,
      "mean": 3.0,
      "sd": 3.8
     },
     "not_matched": {
      "n": 76,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 13,
      "iqr": 3.0,
      "mean": 2.9,
      "sd": 2.9
     }
    },
    "presentations": {
     "matched": {
      "n": 38,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 8.0,
      "max": 16,
      "iqr": 7.0,
      "mean": 4.4,
      "sd": 4.0
     },
     "not_matched": {
      "n": 76,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 7.0,
      "max": 17,
      "iqr": 5.0,
      "mean": 4.8,
      "sd": 4.6
     }
    },
    "publications": {
     "matched": {
      "n": 38,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 28,
      "iqr": 3.0,
      "mean": 5.2,
      "sd": 6.8
     },
     "not_matched": {
      "n": 76,
      "min": 0,
      "q1": 1.0,
      "median": 2.0,
      "q3": 6.0,
      "max": 23,
      "iqr": 5.0,
      "mean": 4.4,
      "sd": 5.2
     }
    },
    "work": {
     "matched": {
      "n": 38,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 10,
      "iqr": 2.0,
      "mean": 3.4,
      "sd": 2.4
     },
     "not_matched": {
      "n": 76,
      "min": 1,
      "q1": 2.0,
      "median": 4.0,
      "q3": 6.0,
      "max": 12,
      "iqr": 4.0,
      "mean": 4.4,
      "sd": 2.6
     }
    },
    "volunteer": {
     "matched": {
      "n": 38,
      "min": 1,
      "q1": 2.0,
      "median": 3.5,
      "q3": 6.0,
      "max": 20,
      "iqr": 4.0,
      "mean": 4.5,
      "sd": 3.5
     },
     "not_matched": {
      "n": 76,
      "min": 1,
      "q1": 3.0,
      "median": 4.0,
      "q3": 6.0,
      "max": 23,
      "iqr": 3.0,
      "mean": 4.8,
      "sd": 3.9
     }
    }
   },
   "phd": {
    "matched": 2.6,
    "not_matched": 1.4
   },
   "gradDegree": {
    "matched": 18.4,
    "not_matched": 37.8
   }
  },
  {
   "name": "Surgery-General",
   "short": "General Surgery",
   "positions": 1807,
   "allApplicants": 2760,
   "imgMatched": 124,
   "imgNotMatched": 309,
   "imgTotal": 433,
   "matchRate": 28.6,
   "allPerPos": 1.53,
   "imgPerPos": 0.24,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 102,
      "min": 1,
      "q1": 1.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 20,
      "iqr": 3.0,
      "mean": 3.7,
      "sd": 3.4
     },
     "not_matched": {
      "n": 230,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 3.0,
      "max": 20,
      "iqr": 2.0,
      "mean": 2.2,
      "sd": 2.4
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 102,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 1.0,
      "max": 3,
      "iqr": 0.0,
      "mean": 1.1,
      "sd": 0.4
     },
     "not_matched": {
      "n": 230,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 1.0,
      "max": 5,
      "iqr": 0.0,
      "mean": 1.2,
      "sd": 0.6
     }
    },
    "step2ck": {
     "matched": {
      "n": 102,
      "min": 216,
      "q1": 244.0,
      "median": 256.0,
      "q3": 264.0,
      "max": 275,
      "iqr": 20.0,
      "mean": 253.0,
      "sd": 13.0
     },
     "not_matched": {
      "n": 230,
      "min": 209,
      "q1": 238.0,
      "median": 247.0,
      "q3": 256.0,
      "max": 280,
      "iqr": 18.0,
      "mean": 246.0,
      "sd": 14.0
     }
    },
    "research": {
     "matched": {
      "n": 102,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 10.0,
      "max": 104,
      "iqr": 8.0,
      "mean": 10.1,
      "sd": 17.5
     },
     "not_matched": {
      "n": 230,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 8.0,
      "max": 135,
      "iqr": 6.0,
      "mean": 8.4,
      "sd": 15.4
     }
    },
    "abstracts": {
     "matched": {
      "n": 102,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 13.0,
      "max": 45,
      "iqr": 11.0,
      "mean": 8.9,
      "sd": 10.3
     },
     "not_matched": {
      "n": 230,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 7.0,
      "max": 150,
      "iqr": 6.0,
      "mean": 6.6,
      "sd": 13.8
     }
    },
    "presentations": {
     "matched": {
      "n": 102,
      "min": 0,
      "q1": 3.0,
      "median": 5.5,
      "q3": 15.0,
      "max": 47,
      "iqr": 12.0,
      "mean": 10.0,
      "sd": 10.5
     },
     "not_matched": {
      "n": 230,
      "min": 0,
      "q1": 1.0,
      "median": 3.0,
      "q3": 10.0,
      "max": 150,
      "iqr": 9.0,
      "mean": 7.6,
      "sd": 14.1
     }
    },
    "publications": {
     "matched": {
      "n": 102,
      "min": 0,
      "q1": 4.0,
      "median": 8.0,
      "q3": 16.0,
      "max": 60,
      "iqr": 12.0,
      "mean": 12.1,
      "sd": 12.7
     },
     "not_matched": {
      "n": 230,
      "min": 0,
      "q1": 2.0,
      "median": 5.0,
      "q3": 10.0,
      "max": 140,
      "iqr": 8.0,
      "mean": 9.2,
      "sd": 14.3
     }
    },
    "work": {
     "matched": {
      "n": 102,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 24,
      "iqr": 2.0,
      "mean": 3.8,
      "sd": 3.3
     },
     "not_matched": {
      "n": 230,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 17,
      "iqr": 3.0,
      "mean": 4.0,
      "sd": 3.1
     }
    },
    "volunteer": {
     "matched": {
      "n": 102,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 17,
      "iqr": 2.0,
      "mean": 3.7,
      "sd": 2.8
     },
     "not_matched": {
      "n": 230,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 14,
      "iqr": 3.0,
      "mean": 3.5,
      "sd": 2.6
     }
    }
   },
   "phd": {
    "matched": 1.1,
    "not_matched": 1.6
   },
   "gradDegree": {
    "matched": 16.3,
    "not_matched": 26.9
   }
  },
  {
   "name": "Thoracic Surgery (Integrated)",
   "short": "Thoracic Surgery",
   "positions": 56,
   "allApplicants": 89,
   "imgMatched": 2,
   "imgNotMatched": 5,
   "imgTotal": 7,
   "matchRate": 28.6,
   "allPerPos": 1.59,
   "imgPerPos": 0.12,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "step2ck": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "research": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "abstracts": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "presentations": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "publications": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "work": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    },
    "volunteer": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     }
    }
   },
   "phd": {
    "matched": null,
    "not_matched": null
   },
   "gradDegree": {
    "matched": null,
    "not_matched": null
   }
  },
  {
   "name": "Neurological Surgery",
   "short": "Neurosurgery",
   "positions": 280,
   "allApplicants": 480,
   "imgMatched": 15,
   "imgNotMatched": 43,
   "imgTotal": 58,
   "matchRate": 25.9,
   "allPerPos": 1.71,
   "imgPerPos": 0.21,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 8,
      "min": 1,
      "q1": 2.0,
      "median": 3.5,
      "q3": 6.0,
      "max": 16,
      "iqr": 4.0,
      "mean": 5.4,
      "sd": 4.8
     },
     "not_matched": {
      "n": 34,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 20,
      "iqr": 3.0,
      "mean": 3.5,
      "sd": 3.8
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 8,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 1.0,
      "max": 2,
      "iqr": 0.0,
      "mean": 1.1,
      "sd": 0.4
     },
     "not_matched": {
      "n": 34,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 3,
      "iqr": 1.0,
      "mean": 1.4,
      "sd": 0.6
     }
    },
    "step2ck": {
     "matched": {
      "n": 8,
      "min": 239,
      "q1": 245.0,
      "median": 254.0,
      "q3": 264.0,
      "max": 269,
      "iqr": 19.0,
      "mean": 255.0,
      "sd": 11.0
     },
     "not_matched": {
      "n": 34,
      "min": 216,
      "q1": 241.0,
      "median": 252.0,
      "q3": 258.0,
      "max": 276,
      "iqr": 17.0,
      "mean": 249.0,
      "sd": 16.0
     }
    },
    "research": {
     "matched": {
      "n": 8,
      "min": 3,
      "q1": 3.0,
      "median": 44.0,
      "q3": 90.0,
      "max": 199,
      "iqr": 87.0,
      "mean": 59.0,
      "sd": 70.8
     },
     "not_matched": {
      "n": 34,
      "min": 1,
      "q1": 3.0,
      "median": 5.0,
      "q3": 10.0,
      "max": 130,
      "iqr": 7.0,
      "mean": 17.0,
      "sd": 29.3
     }
    },
    "abstracts": {
     "matched": {
      "n": 8,
      "min": 3,
      "q1": 9.0,
      "median": 20.0,
      "q3": 38.0,
      "max": 63,
      "iqr": 29.0,
      "mean": 24.7,
      "sd": 20.5
     },
     "not_matched": {
      "n": 34,
      "min": 0,
      "q1": 3.0,
      "median": 14.0,
      "q3": 25.0,
      "max": 101,
      "iqr": 22.0,
      "mean": 20.3,
      "sd": 24.5
     }
    },
    "presentations": {
     "matched": {
      "n": 8,
      "min": 4,
      "q1": 9.0,
      "median": 13.0,
      "q3": 63.0,
      "max": 93,
      "iqr": 54.0,
      "mean": 29.6,
      "sd": 34.4
     },
     "not_matched": {
      "n": 34,
      "min": 1,
      "q1": 5.0,
      "median": 14.0,
      "q3": 40.0,
      "max": 170,
      "iqr": 35.0,
      "mean": 29.2,
      "sd": 36.9
     }
    },
    "publications": {
     "matched": {
      "n": 8,
      "min": 20,
      "q1": 21.0,
      "median": 70.0,
      "q3": 90.0,
      "max": 136,
      "iqr": 69.0,
      "mean": 68.3,
      "sd": 41.5
     },
     "not_matched": {
      "n": 34,
      "min": 1,
      "q1": 10.0,
      "median": 28.0,
      "q3": 51.0,
      "max": 81,
      "iqr": 41.0,
      "mean": 32.0,
      "sd": 24.1
     }
    },
    "work": {
     "matched": {
      "n": 8,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 5.0,
      "max": 9,
      "iqr": 4.0,
      "mean": 3.1,
      "sd": 3.0
     },
     "not_matched": {
      "n": 34,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 10,
      "iqr": 3.0,
      "mean": 3.6,
      "sd": 2.7
     }
    },
    "volunteer": {
     "matched": {
      "n": 8,
      "min": 1,
      "q1": 2.0,
      "median": 3.0,
      "q3": 5.0,
      "max": 10,
      "iqr": 3.0,
      "mean": 3.9,
      "sd": 3.0
     },
     "not_matched": {
      "n": 34,
      "min": 1,
      "q1": 2.0,
      "median": 3.5,
      "q3": 5.0,
      "max": 15,
      "iqr": 3.0,
      "mean": 3.8,
      "sd": 2.9
     }
    }
   },
   "phd": {
    "matched": 14.3,
    "not_matched": 6.5
   },
   "gradDegree": {
    "matched": 28.6,
    "not_matched": 22.6
   }
  },
  {
   "name": "Orthopaedic Surgery",
   "short": "Orthopaedic Surgery",
   "positions": 963,
   "allApplicants": 1598,
   "imgMatched": 5,
   "imgNotMatched": 17,
   "imgTotal": 22,
   "matchRate": 22.7,
   "allPerPos": 1.66,
   "imgPerPos": 0.02,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 1.0,
      "median": 3.0,
      "q3": 4.0,
      "max": 6,
      "iqr": 3.0,
      "mean": 3.0,
      "sd": 1.8
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 4,
      "iqr": 1.0,
      "mean": 1.7,
      "sd": 1.0
     }
    },
    "step2ck": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 14,
      "min": 226,
      "q1": 238.0,
      "median": 244.0,
      "q3": 255.0,
      "max": 257,
      "iqr": 17.0,
      "mean": 244.0,
      "sd": 9.0
     }
    },
    "research": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 14,
      "min": 2,
      "q1": 3.0,
      "median": 8.0,
      "q3": 67.0,
      "max": 493,
      "iqr": 64.0,
      "mean": 72.3,
      "sd": 144.7
     }
    },
    "abstracts": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 14,
      "min": 3,
      "q1": 10.0,
      "median": 14.0,
      "q3": 35.0,
      "max": 144,
      "iqr": 25.0,
      "mean": 36.1,
      "sd": 46.9
     }
    },
    "presentations": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 5.0,
      "median": 17.0,
      "q3": 53.0,
      "max": 151,
      "iqr": 48.0,
      "mean": 39.6,
      "sd": 50.2
     }
    },
    "publications": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 11.0,
      "median": 18.0,
      "q3": 52.0,
      "max": 232,
      "iqr": 41.0,
      "mean": 45.6,
      "sd": 65.4
     }
    },
    "work": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 14,
      "min": 2,
      "q1": 3.0,
      "median": 3.5,
      "q3": 5.0,
      "max": 8,
      "iqr": 2.0,
      "mean": 4.1,
      "sd": 1.9
     }
    },
    "volunteer": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 14,
      "min": 1,
      "q1": 3.0,
      "median": 5.5,
      "q3": 8.0,
      "max": 10,
      "iqr": 5.0,
      "mean": 5.4,
      "sd": 3.2
     }
    }
   },
   "phd": {
    "matched": null,
    "not_matched": 0.0
   },
   "gradDegree": {
    "matched": null,
    "not_matched": 27.3
   }
  },
  {
   "name": "Plastic Surgery (Integrated)",
   "short": "Plastic Surgery",
   "positions": 230,
   "allApplicants": 406,
   "imgMatched": 5,
   "imgNotMatched": 22,
   "imgTotal": 27,
   "matchRate": 18.5,
   "allPerPos": 1.77,
   "imgPerPos": 0.12,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 6,
      "iqr": 1.0,
      "mean": 2.3,
      "sd": 1.5
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 4,
      "iqr": 1.0,
      "mean": 1.8,
      "sd": 0.9
     }
    },
    "step2ck": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 20,
      "min": 217,
      "q1": 238.0,
      "median": 251.0,
      "q3": 259.0,
      "max": 268,
      "iqr": 21.0,
      "mean": 248.0,
      "sd": 13.0
     }
    },
    "research": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 20,
      "min": 2,
      "q1": 3.0,
      "median": 4.5,
      "q3": 7.0,
      "max": 62,
      "iqr": 4.0,
      "mean": 11.0,
      "sd": 16.2
     }
    },
    "abstracts": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 4.0,
      "median": 10.0,
      "q3": 30.0,
      "max": 60,
      "iqr": 26.0,
      "mean": 16.5,
      "sd": 17.1
     }
    },
    "presentations": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 7.0,
      "median": 20.0,
      "q3": 38.0,
      "max": 70,
      "iqr": 31.0,
      "mean": 25.2,
      "sd": 21.4
     }
    },
    "publications": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 11.0,
      "median": 25.0,
      "q3": 55.0,
      "max": 126,
      "iqr": 44.0,
      "mean": 32.5,
      "sd": 33.6
     }
    },
    "work": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 3.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 10,
      "iqr": 3.0,
      "mean": 4.5,
      "sd": 2.8
     }
    },
    "volunteer": {
     "matched": {
      "n": 2,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 20,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 4.0,
      "max": 10,
      "iqr": 3.0,
      "mean": 3.0,
      "sd": 2.7
     }
    }
   },
   "phd": {
    "matched": null,
    "not_matched": 5.9
   },
   "gradDegree": {
    "matched": null,
    "not_matched": 35.3
   }
  },
  {
   "name": "Dermatology",
   "short": "Dermatology",
   "positions": 602,
   "allApplicants": 1099,
   "imgMatched": 5,
   "imgNotMatched": 25,
   "imgTotal": 30,
   "matchRate": 16.7,
   "allPerPos": 1.83,
   "imgPerPos": 0.05,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 4,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 3.0,
      "max": 14,
      "iqr": 2.0,
      "mean": 2.7,
      "sd": 3.4
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 4,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 1,
      "q1": 1.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 5,
      "iqr": 2.0,
      "mean": 2.1,
      "sd": 1.3
     }
    },
    "step2ck": {
     "matched": {
      "n": 4,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 232,
      "q1": 237.0,
      "median": 253.0,
      "q3": 261.0,
      "max": 275,
      "iqr": 24.0,
      "mean": 250.0,
      "sd": 14.0
     }
    },
    "research": {
     "matched": {
      "n": 4,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 0,
      "q1": 3.0,
      "median": 4.0,
      "q3": 8.0,
      "max": 12,
      "iqr": 5.0,
      "mean": 5.1,
      "sd": 3.2
     }
    },
    "abstracts": {
     "matched": {
      "n": 4,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 0,
      "q1": 4.0,
      "median": 6.5,
      "q3": 15.0,
      "max": 38,
      "iqr": 11.0,
      "mean": 10.5,
      "sd": 10.0
     }
    },
    "presentations": {
     "matched": {
      "n": 4,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 2,
      "q1": 5.0,
      "median": 8.5,
      "q3": 15.0,
      "max": 800,
      "iqr": 10.0,
      "mean": 59.9,
      "sd": 197.5
     }
    },
    "publications": {
     "matched": {
      "n": 4,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 0,
      "q1": 4.0,
      "median": 12.0,
      "q3": 23.0,
      "max": 70,
      "iqr": 19.0,
      "mean": 16.5,
      "sd": 17.2
     }
    },
    "work": {
     "matched": {
      "n": 4,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 5.0,
      "max": 10,
      "iqr": 3.0,
      "mean": 3.8,
      "sd": 2.3
     }
    },
    "volunteer": {
     "matched": {
      "n": 4,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 1,
      "q1": 2.0,
      "median": 2.0,
      "q3": 3.0,
      "max": 8,
      "iqr": 1.0,
      "mean": 2.8,
      "sd": 1.7
     }
    }
   },
   "phd": {
    "matched": null,
    "not_matched": 12.5
   },
   "gradDegree": {
    "matched": null,
    "not_matched": 47.1
   }
  },
  {
   "name": "Vascular Surgery (Integrated)",
   "short": "Vascular Surgery",
   "positions": 110,
   "allApplicants": 165,
   "imgMatched": 4,
   "imgNotMatched": 24,
   "imgTotal": 28,
   "matchRate": 14.3,
   "allPerPos": 1.5,
   "imgPerPos": 0.25,
   "metrics": {
    "contiguous_ranks": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 1,
      "q1": 1.0,
      "median": 1.0,
      "q3": 2.0,
      "max": 3,
      "iqr": 1.0,
      "mean": 1.6,
      "sd": 0.8
     }
    },
    "specialties_ranked": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 1,
      "q1": 2.0,
      "median": 2.0,
      "q3": 2.0,
      "max": 3,
      "iqr": 0.0,
      "mean": 2.0,
      "sd": 0.5
     }
    },
    "step2ck": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 223,
      "q1": 240.0,
      "median": 247.0,
      "q3": 257.0,
      "max": 269,
      "iqr": 17.0,
      "mean": 247.0,
      "sd": 12.0
     }
    },
    "research": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 0,
      "q1": 2.0,
      "median": 4.0,
      "q3": 5.0,
      "max": 19,
      "iqr": 3.0,
      "mean": 4.6,
      "sd": 4.2
     }
    },
    "abstracts": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 0,
      "q1": 3.0,
      "median": 11.0,
      "q3": 20.0,
      "max": 76,
      "iqr": 17.0,
      "mean": 15.1,
      "sd": 18.8
     }
    },
    "presentations": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 0,
      "q1": 1.0,
      "median": 10.0,
      "q3": 14.0,
      "max": 48,
      "iqr": 13.0,
      "mean": 10.6,
      "sd": 11.5
     }
    },
    "publications": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 0,
      "q1": 4.0,
      "median": 15.0,
      "q3": 18.0,
      "max": 50,
      "iqr": 14.0,
      "mean": 14.8,
      "sd": 13.1
     }
    },
    "work": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 0,
      "q1": 2.0,
      "median": 3.0,
      "q3": 6.0,
      "max": 9,
      "iqr": 4.0,
      "mean": 3.7,
      "sd": 2.6
     }
    },
    "volunteer": {
     "matched": {
      "n": 3,
      "min": null,
      "q1": null,
      "median": null,
      "q3": null,
      "max": null,
      "iqr": null,
      "mean": null,
      "sd": null
     },
     "not_matched": {
      "n": 19,
      "min": 1,
      "q1": 2.0,
      "median": 2.5,
      "q3": 6.0,
      "max": 15,
      "iqr": 4.0,
      "mean": 4.7,
      "sd": 4.1
     }
    }
   },
   "phd": {
    "matched": null,
    "not_matched": 5.3
   },
   "gradDegree": {
    "matched": null,
    "not_matched": 31.6
   }
  }
 ]
};
