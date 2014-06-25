(defproject clojurescript-addons "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :plugins [[lein-cljsbuild "0.3.0"]]
  :cljsbuild {:builds [{:source-paths ["src-cljs"]
                        :compiler {:output-to "resources/public/js/cljsbuild-main.js"
                        :optimizations :whitespace
                        :pretty-print true}}]}
  :dependencies [[org.clojure/clojure "1.5.1"]])


